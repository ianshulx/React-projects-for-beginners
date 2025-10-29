import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  User, 
  Calendar,
  BookOpen,
  Star,
  Clock,
  CheckCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      const bookData = response.data.book;
      setBook(bookData);
      setCurrentPage(bookData.currentPage);
    } catch (error) {
      console.error('Error fetching book:', error);
      toast.error('Failed to load book details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/api/books/${id}`);
      toast.success('Book deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  const handleProgressUpdate = async (e) => {
    e.preventDefault();
    if (currentPage === book.currentPage) return;

    setIsUpdatingProgress(true);
    try {
      const response = await axios.patch(`/api/books/${id}/progress`, {
        currentPage: parseInt(currentPage)
      });
      
      setBook(response.data.book);
      toast.success('Progress updated successfully');
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      'not-started': 'bg-gray-100 text-gray-800',
      'reading': 'bg-blue-100 text-blue-800',
      'finished': 'bg-green-100 text-green-800',
      'paused': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || colors['not-started'];
  };

  const getStatusLabel = (status) => {
    const labels = {
      'not-started': 'Not Started',
      'reading': 'Reading',
      'finished': 'Finished',
      'paused': 'Paused'
    };
    return labels[status] || 'Unknown';
  };

  if (loading) {
    return <LoadingSpinner text="Loading book details..." />;
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Book not found</h3>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Book Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Cover and Actions */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8">
            {/* Cover Image */}
            <div className="text-center mb-6">
              {book.coverImage ? (
                <img
                  src={`http://localhost:5000${book.coverImage}`}
                  alt={`${book.title} cover`}
                  className="w-48 h-64 object-cover rounded-lg shadow-lg mx-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-48 h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg shadow-lg mx-auto flex items-center justify-center ${book.coverImage ? 'hidden' : 'flex'}`}
              >
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Status */}
            <div className="text-center mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(book.status)}`}>
                {getStatusLabel(book.status)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to={`/books/${book._id}/edit`}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Book</span>
              </Link>
              
              <button
                onClick={handleDelete}
                className="w-full btn-danger flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Book</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Book Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Author */}
          <div className="card p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 flex items-center mb-4">
              <User className="w-5 h-5 mr-2" />
              {book.author}
            </p>
            
            {/* Rating */}
            {book.rating && (
              <div className="mb-4">
                {renderStars(book.rating)}
              </div>
            )}
          </div>

          {/* Progress Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Reading Progress
            </h2>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">
                  {book.currentPage} / {book.totalPages} pages ({book.progressPercentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full progress-bar"
                  style={{ width: `${book.progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Progress Update Form */}
            <form onSubmit={handleProgressUpdate} className="flex items-center space-x-3">
              <div className="flex-1">
                <label htmlFor="currentPage" className="block text-sm font-medium text-gray-700 mb-1">
                  Update Current Page
                </label>
                <input
                  id="currentPage"
                  type="number"
                  min="0"
                  max={book.totalPages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(parseInt(e.target.value) || 0)}
                  className="form-input"
                  placeholder="Current page"
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingProgress || currentPage === book.currentPage}
                className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdatingProgress ? 'Updating...' : 'Update'}
              </button>
            </form>
          </div>

          {/* Book Details */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Book Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Pages</h3>
                <p className="text-lg text-gray-900">{book.totalPages.toLocaleString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Start Date</h3>
                <p className="text-lg text-gray-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(book.startDate), 'MMMM dd, yyyy')}
                </p>
              </div>
              
              {book.finishDate && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Finish Date</h3>
                  <p className="text-lg text-gray-900 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {format(new Date(book.finishDate), 'MMMM dd, yyyy')}
                  </p>
                </div>
              )}
              
              {book.readingDuration && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Reading Duration</h3>
                  <p className="text-lg text-gray-900 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {book.readingDuration} days
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {book.notes && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Notes
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{book.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
