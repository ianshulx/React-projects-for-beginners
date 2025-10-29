import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Edit, Save, X } from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || ''
  });
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
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
    const result = await updateProfile(formData);
    
    if (result.success) {
      setIsEditing(false);
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  if (!user) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          /* Edit Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="form-label">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="First name"
                />
                {errors.firstName && <p className="form-error">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="form-label">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Last name"
                />
                {errors.lastName && <p className="form-error">{errors.lastName}</p>}
              </div>
            </div>

            {/* Read-only fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="form-input bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
              </div>

              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="form-input bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
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
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Display Mode */
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">First Name</h3>
                <p className="text-lg text-gray-900 flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  {user.firstName}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Last Name</h3>
                <p className="text-lg text-gray-900 flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  {user.lastName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Username</h3>
                <p className="text-lg text-gray-900">@{user.username}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-lg text-gray-900 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="card p-8 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Account Security</h3>
          <p className="text-sm text-blue-700 mb-3">
            Your account is secured with JWT authentication. For enhanced security, 
            we recommend logging out from shared devices.
          </p>
          <p className="text-xs text-blue-600">
            <strong>Note:</strong> Username and email cannot be changed after registration. 
            If you need to update these, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
