import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Plus, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Filter,
  Search,
  BarChart3
} from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';
import BookCard from '../Books/BookCard';
import StatsCard from './StatsCard';

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
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}! 📚
        </h1>
        <p className="mt-2 text-gray-600">
          Track your reading progress and discover new books
        </p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Books"
            value={stats.totalBooks}
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            title="Currently Reading"
            value={stats.currentlyReading}
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Finished Books"
            value={stats.finishedBooks}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Pages Read"
            value={stats.totalPagesRead.toLocaleString()}
            icon={TrendingUp}
            color="purple"
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2" />
            Your Library
          </h2>
          <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {filteredBooks.length} books
          </span>
        </div>
        
        <Link
          to="/books/new"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="not-started">Not Started</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="form-input min-w-[140px]"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="author-asc">Author A-Z</option>
                <option value="author-desc">Author Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No books found' : 'No books yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Start building your reading library by adding your first book'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Link
              to="/books/new"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Book</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={handleDeleteBook}
              onProgressUpdate={handleProgressUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
