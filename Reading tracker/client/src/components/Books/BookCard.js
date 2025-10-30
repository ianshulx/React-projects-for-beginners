import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
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
  Play,
  Star,
  TrendingUp,
  Zap
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
    <motion.div 
      className="card-gradient p-6 card-hover group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Floating background elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full blur-xl transform -translate-x-2 translate-y-2 group-hover:scale-125 transition-transform duration-700"></div>
      
      {/* Book Cover and Basic Info */}
      <div className="flex items-start space-x-4 mb-6 relative z-10">
        {/* Cover Image */}
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.2 }}
        >
          {book.coverImage ? (
            <img
              src={`http://localhost:5000${book.coverImage}`}
              alt={`${book.title} cover`}
              className="w-20 h-28 object-cover rounded-xl shadow-lg border-2 border-white/50"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={`w-20 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center border-2 border-white/50 ${book.coverImage ? 'hidden' : 'flex'}`}
          >
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          <motion.h3 
            className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent truncate mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {book.title}
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-600 flex items-center mb-3 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <User className="w-4 h-4 mr-2 text-blue-500" />
            {book.author}
          </motion.p>
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${status.color}`}>
              <StatusIcon className="w-3 h-3 mr-1.5" />
              {status.label}
            </span>
            {book.progressPercentage === 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="mb-6 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
            Reading Progress
          </span>
          <motion.span 
            className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {book.currentPage} / {book.totalPages} pages ({book.progressPercentage}%)
          </motion.span>
        </div>
        <div className="progress-container relative">
          <motion.div
            className="progress-bar-enhanced"
            initial={{ width: 0 }}
            animate={{ width: `${book.progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
        {book.progressPercentage > 0 && (
          <motion.div
            className="mt-2 text-xs text-gray-500 flex items-center justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Zap className="w-3 h-3 mr-1 text-yellow-500" />
            {book.progressPercentage >= 75 ? "Almost there!" : book.progressPercentage >= 50 ? "Great progress!" : "Keep going!"}
          </motion.div>
        )}
      </motion.div>

      {/* Progress Update Form */}
      <motion.form 
        onSubmit={handleProgressSubmit} 
        className="mb-6 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <input
            type="number"
            min="0"
            max={book.totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value) || 0)}
            className="form-input flex-1 text-sm font-medium shadow-md border-0 focus:ring-4 focus:ring-blue-200"
            placeholder="Current page"
          />
          <motion.button
            type="submit"
            disabled={isUpdatingProgress || currentPage === book.currentPage}
            className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isUpdatingProgress ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.div>
            ) : (
              'Update'
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Quick Progress Buttons */}
      {book.status === 'reading' && book.currentPage < book.totalPages && (
        <motion.div 
          className="flex justify-center space-x-3 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[10, 25, 50].map((pages, index) => (
            <motion.button
              key={pages}
              onClick={() => handleQuickProgress(pages)}
              disabled={isUpdatingProgress}
              className="btn-secondary text-xs px-3 py-2 font-semibold shadow-md disabled:opacity-50"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
            >
              +{pages}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Book Metadata */}
      <motion.div 
        className="text-xs text-gray-500 mb-6 space-y-2 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex items-center bg-gray-50/80 rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          <span className="font-medium">Started: {format(new Date(book.startDate), 'MMM dd, yyyy')}</span>
        </div>
        {book.finishDate && (
          <div className="flex items-center bg-green-50/80 rounded-lg px-3 py-2">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span className="font-medium">Finished: {format(new Date(book.finishDate), 'MMM dd, yyyy')}</span>
          </div>
        )}
        {book.readingDuration && (
          <div className="flex items-center bg-purple-50/80 rounded-lg px-3 py-2">
            <Clock className="w-4 h-4 mr-2 text-purple-500" />
            <span className="font-medium">Reading time: {book.readingDuration} days</span>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex justify-between items-center pt-4 border-t border-gray-200/50 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={`/books/${book._id}`}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </motion.div>
        
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/books/${book._id}/edit`}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm font-medium bg-gray-100/80 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </Link>
          </motion.div>
          
          <motion.button
            onClick={() => onDelete(book._id)}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium bg-red-50/80 px-3 py-2 rounded-lg hover:bg-red-100 transition-all duration-200"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookCard;
