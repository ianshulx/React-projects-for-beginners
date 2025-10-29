import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, User, LogOut, Menu, X, Plus, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!user) {
    return (
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-800">Reading Tracker</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/login') 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/register') 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-800">Reading Tracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/books/new" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/books/new') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              <Link 
                to="/profile" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/profile') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{user.firstName}</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/books/new" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/books/new') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Book</span>
              </Link>
              
              <Link 
                to="/profile" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/profile') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-red-600 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
