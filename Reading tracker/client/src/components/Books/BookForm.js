import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { 
  BookOpen, 
  User, 
  FileText, 
  Calendar,
  Upload,
  X,
  Star,
  ArrowLeft
} from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: '',
    currentPage: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    notes: '',
    rating: '',
    status: 'not-started'
  });
  const [coverImage, setCoverImage] = useState(null);
  const [existingCoverImage, setExistingCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});

  // Load book data for editing
  useEffect(() => {
    if (isEditing) {
      fetchBook();
    }
  }, [id, isEditing]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      const book = response.data.book;
      
      setFormData({
        title: book.title,
        author: book.author,
        totalPages: book.totalPages.toString(),
        currentPage: book.currentPage.toString(),
        startDate: format(new Date(book.startDate), 'yyyy-MM-dd'),
        notes: book.notes || '',
        rating: book.rating ? book.rating.toString() : '',
        status: book.status
      });
      
      if (book.coverImage) {
        setExistingCoverImage(book.coverImage);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
      toast.error('Failed to load book data');
      navigate('/dashboard');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setCoverImage(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setExistingCoverImage(null);
    // Reset file input
    const fileInput = document.getElementById('coverImage');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.totalPages || parseInt(formData.totalPages) < 1) {
      newErrors.totalPages = 'Total pages must be at least 1';
    }

    if (formData.currentPage && parseInt(formData.currentPage) > parseInt(formData.totalPages)) {
      newErrors.currentPage = 'Current page cannot exceed total pages';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.rating && (parseInt(formData.rating) < 1 || parseInt(formData.rating) > 5)) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append cover image if selected
      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }

      let response;
      if (isEditing) {
        response = await axios.put(`/api/books/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Book updated successfully');
      } else {
        response = await axios.post('/api/books', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Book added successfully');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving book:', error);
      const message = error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'add'} book`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner text="Loading book data..." />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Book' : 'Add New Book'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isEditing 
            ? 'Update your book details and reading progress'
            : 'Add a new book to your reading library'
          }
        </p>
      </div>

      {/* Form */}
      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image Upload */}
          <div>
            <label className="form-label">Book Cover (Optional)</label>
            <div className="mt-1 flex items-center space-x-4">
              {/* Current/Preview Image */}
              {(existingCoverImage || coverImage) && (
                <div className="relative">
                  <img
                    src={coverImage 
                      ? URL.createObjectURL(coverImage)
                      : `http://localhost:5000${existingCoverImage}`
                    }
                    alt="Book cover preview"
                    className="w-20 h-24 object-cover rounded-lg shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {/* Upload Button */}
              <div>
                <label
                  htmlFor="coverImage"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {existingCoverImage || coverImage ? 'Change Cover' : 'Upload Cover'}
                </label>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="form-label">
              Book Title *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className={`form-input pl-10 ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter book title"
              />
            </div>
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="form-label">
              Author *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                className={`form-input pl-10 ${errors.author ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter author name"
              />
            </div>
            {errors.author && <p className="form-error">{errors.author}</p>}
          </div>

          {/* Pages */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="totalPages" className="form-label">
                Total Pages *
              </label>
              <input
                id="totalPages"
                name="totalPages"
                type="number"
                min="1"
                value={formData.totalPages}
                onChange={handleChange}
                className={`form-input ${errors.totalPages ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Total pages"
              />
              {errors.totalPages && <p className="form-error">{errors.totalPages}</p>}
            </div>

            <div>
              <label htmlFor="currentPage" className="form-label">
                Current Page
              </label>
              <input
                id="currentPage"
                name="currentPage"
                type="number"
                min="0"
                max={formData.totalPages || undefined}
                value={formData.currentPage}
                onChange={handleChange}
                className={`form-input ${errors.currentPage ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Current page"
              />
              {errors.currentPage && <p className="form-error">{errors.currentPage}</p>}
            </div>
          </div>

          {/* Start Date and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="form-label">
                Start Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`form-input pl-10 ${errors.startDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.startDate && <p className="form-error">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="not-started">Not Started</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="form-label">
              Rating (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Star className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className={`form-input pl-10 ${errors.rating ? 'border-red-500 focus:ring-red-500' : ''}`}
              >
                <option value="">No rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            {errors.rating && <p className="form-error">{errors.rating}</p>}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="form-label">
              Notes (Optional)
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="form-input pl-10 resize-none"
                placeholder="Add your thoughts, quotes, or notes about this book..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <LoadingSpinner size="small" text="" />
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>{isEditing ? 'Update Book' : 'Add Book'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
