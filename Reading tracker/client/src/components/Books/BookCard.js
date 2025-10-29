import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  BookOpen,
  Clock,
  CheckCircle,
  Pause,
  Play
} from 'lucide-react';

const BookCard = ({ book, onDelete, onProgressUpdate }) => {
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [currentPage, setCurrentPage] = useState(book.currentPage);

  // Status configurations
  const statusConfig = {
    'not-started': {
      label: 'Not Started',
      color: 'bg-gray-100 text-gray-800',
      icon: BookOpen
    },
    'reading': {
      label: 'Reading',
      color: 'bg-blue-100 text-blue-800',
      icon: Play
    },
    'finished': {
      label: 'Finished',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    'paused': {
      label: 'Paused',
      color: 'bg-yellow-100 text-yellow-800',
      icon: Pause
    }
  };

  const status = statusConfig[book.status] || statusConfig['not-started'];
  const StatusIcon = status.icon;

  // Handle progress update
  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    if (currentPage === book.currentPage) return;

    setIsUpdatingProgress(true);
    await onProgressUpdate(book._id, currentPage);
    setIsUpdatingProgress(false);
  };

  // Handle quick progress buttons
  const handleQuickProgress = async (pages) => {
    const newPage = Math.min(book.currentPage + pages, book.totalPages);
    setCurrentPage(newPage);
    setIsUpdatingProgress(true);
    await onProgressUpdate(book._id, newPage);
    setIsUpdatingProgress(false);
  };

  return (
    <div className="card p-6 card-hover">
      {/* Book Cover and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Cover Image */}
        <div className="flex-shrink-0">
          {book.coverImage ? (
            <img
              src={`http://localhost:5000${book.coverImage}`}
              alt={`${book.title} cover`}
              className="w-16 h-20 object-cover rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={`w-16 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg shadow-sm flex items-center justify-center ${book.coverImage ? 'hidden' : 'flex'}`}
          >
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <User className="w-3 h-3 mr-1" />
            {book.author}
          </p>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">
            {book.currentPage} / {book.totalPages} pages ({book.progressPercentage}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full progress-bar"
            style={{ width: `${book.progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Progress Update Form */}
      <form onSubmit={handleProgressSubmit} className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            max={book.totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value) || 0)}
            className="form-input flex-1 text-sm"
            placeholder="Current page"
          />
          <button
            type="submit"
            disabled={isUpdatingProgress || currentPage === book.currentPage}
            className="btn-primary text-sm px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingProgress ? '...' : 'Update'}
          </button>
        </div>
      </form>

      {/* Quick Progress Buttons */}
      {book.status === 'reading' && book.currentPage < book.totalPages && (
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => handleQuickProgress(10)}
            disabled={isUpdatingProgress}
            className="btn-secondary text-xs px-2 py-1"
          >
            +10
          </button>
          <button
            onClick={() => handleQuickProgress(25)}
            disabled={isUpdatingProgress}
            className="btn-secondary text-xs px-2 py-1"
          >
            +25
          </button>
          <button
            onClick={() => handleQuickProgress(50)}
            disabled={isUpdatingProgress}
            className="btn-secondary text-xs px-2 py-1"
          >
            +50
          </button>
        </div>
      )}

      {/* Book Metadata */}
      <div className="text-xs text-gray-500 mb-4 space-y-1">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          Started: {format(new Date(book.startDate), 'MMM dd, yyyy')}
        </div>
        {book.finishDate && (
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Finished: {format(new Date(book.finishDate), 'MMM dd, yyyy')}
          </div>
        )}
        {book.readingDuration && (
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Reading time: {book.readingDuration} days
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <Link
          to={`/books/${book._id}`}
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link
            to={`/books/${book._id}/edit`}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
          
          <button
            onClick={() => onDelete(book._id)}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
