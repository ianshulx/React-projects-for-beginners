import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Plus, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Filter,
  Search,
  BarChart3,
  Sparkles,
  Target,
  Award
} from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';
import BookCard from '../Books/BookCard';
import StatsCard from './StatsCard';
import ReadingChart from './ReadingChart';

const Dashboard = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch books and stats
  useEffect(() => {
    fetchData();
  }, [statusFilter, sortBy, sortOrder]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch books and stats in parallel
      const [booksResponse, statsResponse] = await Promise.all([
        axios.get('/api/books', {
          params: {
            status: statusFilter,
            sortBy,
            order: sortOrder
          }
        }),
        axios.get('/api/books/stats/summary')
      ]);

      setBooks(booksResponse.data.books);
      setStats(statsResponse.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Handle book deletion
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      await axios.delete(`/api/books/${bookId}`);
      setBooks(books.filter(book => book._id !== bookId));
      toast.success('Book deleted successfully');
      
      // Refresh stats
      const statsResponse = await axios.get('/api/books/stats/summary');
      setStats(statsResponse.data.stats);
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  // Handle progress update
  const handleProgressUpdate = async (bookId, currentPage) => {
    try {
      const response = await axios.patch(`/api/books/${bookId}/progress`, {
        currentPage: parseInt(currentPage)
      });
      
      // Update the book in the list
      setBooks(books.map(book => 
        book._id === bookId ? response.data.book : book
      ));
      
      toast.success('Progress updated successfully');
      
      // Refresh stats
      const statsResponse = await axios.get('/api/books/stats/summary');
      setStats(statsResponse.data.stats);
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner text="Loading your reading dashboard..." />;
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Welcome Header */}
      <motion.div 
        className="text-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Welcome back, {user?.firstName}! 
              <motion.span
                className="inline-block ml-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                📚
              </motion.span>
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Track your reading progress and discover new books
            </p>
            <motion.div 
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      {stats && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatsCard
              title="Total Books"
              value={stats.totalBooks}
              icon={BookOpen}
              color="blue"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StatsCard
              title="Currently Reading"
              value={stats.currentlyReading}
              icon={Clock}
              color="yellow"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StatsCard
              title="Finished Books"
              value={stats.finishedBooks}
              icon={CheckCircle}
              color="green"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <StatsCard
              title="Pages Read"
              value={stats.totalPagesRead.toLocaleString()}
              icon={TrendingUp}
              color="purple"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Action Bar */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center space-x-4">
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
            Your Library
          </motion.h2>
          <motion.span 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            {filteredBooks.length} books
          </motion.span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Link
            to="/books/new"
            className="btn-primary flex items-center space-x-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Book</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="card-gradient p-8 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-12 text-lg py-4 shadow-lg border-0 focus:ring-4 focus:ring-blue-200"
              />
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-blue-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input min-w-[160px] text-sm font-medium shadow-lg border-0 focus:ring-4 focus:ring-blue-200"
              >
                <option value="all">All Status</option>
                <option value="not-started">Not Started</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-purple-500" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="form-input min-w-[160px] text-sm font-medium shadow-lg border-0 focus:ring-4 focus:ring-purple-200"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="author-asc">Author A-Z</option>
                <option value="author-desc">Author Z-A</option>
              </select>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Reading Analytics Charts */}
      {stats && books.length > 0 && (
        <ReadingChart books={books} stats={stats} />
      )}

      {/* Books Grid */}
      <AnimatePresence mode="wait">
        {filteredBooks.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <BookOpen className="w-16 h-16 text-gray-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm || statusFilter !== 'all' ? 'No books found' : 'No books yet'}
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters to find what you\'re looking for' 
                : 'Start building your reading library by adding your first book and track your progress'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/books/new"
                  className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Book</span>
                </Link>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.6 + (index * 0.1),
                  type: "spring",
                  stiffness: 100
                }}
              >
                <BookCard
                  book={book}
                  onDelete={handleDeleteBook}
                  onProgressUpdate={handleProgressUpdate}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
