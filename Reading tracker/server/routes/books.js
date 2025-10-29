const express = require('express');
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// @route   GET /api/books
// @desc    Get all books for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build query
    const query = { user: req.user._id };
    if (status && status !== 'all') {
      query.status = status;
    }

    // Build sort object
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const books = await Book.find(query)
      .sort(sortObj)
      .populate('user', 'username firstName lastName');

    res.json({
      message: 'Books retrieved successfully',
      books,
      count: books.length
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
});

// @route   GET /api/books/:id
// @desc    Get a specific book by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('user', 'username firstName lastName');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({
      message: 'Book retrieved successfully',
      book
    });
  } catch (error) {
    console.error('Get book error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    res.status(500).json({ message: 'Server error while fetching book' });
  }
});

// @route   POST /api/books
// @desc    Create a new book
// @access  Private
router.post('/', [
  auth,
  upload.single('coverImage'),
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and cannot exceed 200 characters'),
  body('author')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author is required and cannot exceed 100 characters'),
  body('totalPages')
    .isInt({ min: 1, max: 10000 })
    .withMessage('Total pages must be between 1 and 10,000'),
  body('startDate')
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  body('currentPage')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Current page must be 0 or greater'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, author, totalPages, startDate, currentPage = 0, notes = '', rating } = req.body;

    // Validate currentPage doesn't exceed totalPages
    if (parseInt(currentPage) > parseInt(totalPages)) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: 'Current page cannot exceed total pages' });
    }

    // Create book object
    const bookData = {
      title,
      author,
      totalPages: parseInt(totalPages),
      currentPage: parseInt(currentPage),
      startDate: new Date(startDate),
      notes,
      user: req.user._id
    };

    // Add cover image if uploaded
    if (req.file) {
      bookData.coverImage = `/uploads/${req.file.filename}`;
    }

    // Add rating if provided
    if (rating) {
      bookData.rating = parseInt(rating);
    }

    const book = new Book(bookData);
    await book.save();

    // Populate user data for response
    await book.populate('user', 'username firstName lastName');

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error while creating book' });
  }
});

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private
router.put('/:id', [
  auth,
  upload.single('coverImage'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('author')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author cannot exceed 100 characters'),
  body('totalPages')
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage('Total pages must be between 1 and 10,000'),
  body('currentPage')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Current page must be 0 or greater'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('status')
    .optional()
    .isIn(['not-started', 'reading', 'finished', 'paused'])
    .withMessage('Invalid status')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Find the book
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!book) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update fields
    const updateFields = {};
    const allowedFields = ['title', 'author', 'totalPages', 'currentPage', 'startDate', 'notes', 'rating', 'status'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    // Validate currentPage doesn't exceed totalPages
    const newTotalPages = updateFields.totalPages || book.totalPages;
    const newCurrentPage = updateFields.currentPage !== undefined ? updateFields.currentPage : book.currentPage;
    
    if (newCurrentPage > newTotalPages) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: 'Current page cannot exceed total pages' });
    }

    // Handle cover image update
    if (req.file) {
      // Delete old cover image if it exists
      if (book.coverImage) {
        const oldImagePath = path.join(__dirname, '..', book.coverImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateFields.coverImage = `/uploads/${req.file.filename}`;
    }

    // Update the book
    Object.assign(book, updateFields);
    await book.save();

    // Populate user data for response
    await book.populate('user', 'username firstName lastName');

    res.json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Update book error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    res.status(500).json({ message: 'Server error while updating book' });
  }
});

// @route   PATCH /api/books/:id/progress
// @desc    Update reading progress for a book
// @access  Private
router.patch('/:id/progress', [
  auth,
  body('currentPage')
    .isInt({ min: 0 })
    .withMessage('Current page must be 0 or greater')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { currentPage } = req.body;

    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Validate currentPage doesn't exceed totalPages
    if (currentPage > book.totalPages) {
      return res.status(400).json({ message: 'Current page cannot exceed total pages' });
    }

    book.currentPage = currentPage;
    await book.save();

    await book.populate('user', 'username firstName lastName');

    res.json({
      message: 'Reading progress updated successfully',
      book
    });
  } catch (error) {
    console.error('Update progress error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    res.status(500).json({ message: 'Server error while updating progress' });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Delete cover image if it exists
    if (book.coverImage) {
      const imagePath = path.join(__dirname, '..', book.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    res.status(500).json({ message: 'Server error while deleting book' });
  }
});

// @route   GET /api/books/stats/summary
// @desc    Get reading statistics for the user
// @access  Private
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all books for the user
    const books = await Book.find({ user: userId });

    // Calculate statistics
    const totalBooks = books.length;
    const finishedBooks = books.filter(book => book.status === 'finished').length;
    const currentlyReading = books.filter(book => book.status === 'reading').length;
    const totalPagesRead = books.reduce((sum, book) => sum + book.currentPage, 0);
    const averageProgress = totalBooks > 0 ? 
      Math.round(books.reduce((sum, book) => sum + book.progressPercentage, 0) / totalBooks) : 0;

    // Books by status
    const booksByStatus = {
      'not-started': books.filter(book => book.status === 'not-started').length,
      'reading': currentlyReading,
      'finished': finishedBooks,
      'paused': books.filter(book => book.status === 'paused').length
    };

    res.json({
      message: 'Reading statistics retrieved successfully',
      stats: {
        totalBooks,
        finishedBooks,
        currentlyReading,
        totalPagesRead,
        averageProgress,
        booksByStatus
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
});

module.exports = router;
