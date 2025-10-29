const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  totalPages: {
    type: Number,
    required: [true, 'Total pages is required'],
    min: [1, 'Total pages must be at least 1'],
    max: [10000, 'Total pages cannot exceed 10,000']
  },
  currentPage: {
    type: Number,
    default: 0,
    min: [0, 'Current page cannot be negative'],
    validate: {
      validator: function(value) {
        return value <= this.totalPages;
      },
      message: 'Current page cannot exceed total pages'
    }
  },
  status: {
    type: String,
    enum: ['not-started', 'reading', 'finished', 'paused'],
    default: 'not-started'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  finishDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value >= this.startDate;
      },
      message: 'Finish date cannot be before start date'
    }
  },
  coverImage: {
    type: String, // Store the file path or URL
    default: null
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    default: ''
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for progress percentage
bookSchema.virtual('progressPercentage').get(function() {
  if (this.totalPages === 0) return 0;
  return Math.round((this.currentPage / this.totalPages) * 100);
});

// Virtual for reading duration
bookSchema.virtual('readingDuration').get(function() {
  if (!this.finishDate) return null;
  const duration = this.finishDate - this.startDate;
  return Math.ceil(duration / (1000 * 60 * 60 * 24)); // Duration in days
});

// Ensure virtuals are included in JSON output
bookSchema.set('toJSON', { virtuals: true });
bookSchema.set('toObject', { virtuals: true });

// Update status based on current page
bookSchema.pre('save', function(next) {
  if (this.currentPage === 0) {
    this.status = 'not-started';
  } else if (this.currentPage >= this.totalPages) {
    this.status = 'finished';
    if (!this.finishDate) {
      this.finishDate = new Date();
    }
  } else if (this.status === 'not-started' || this.status === 'finished') {
    this.status = 'reading';
  }
  
  next();
});

// Index for better query performance
bookSchema.index({ user: 1, createdAt: -1 });
bookSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Book', bookSchema);
