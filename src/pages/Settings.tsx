import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';
import PricingSection from '../components/PricingSection';

function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription'>('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              to="/" 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-400 mt-1">Manage your account preferences</p>
            </div>
          </div>

          <div className="border-b border-gray-800 mb-6">
            <nav className="-mb-px flex space-x-4">
              <button
                onClick={() => setActiveTab('profile')}
                data-tab="profile"
                className={`px-2 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('subscription')}
                data-tab="subscription"
                className={`px-2 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === 'subscription'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                Subscription
              </button>
            </nav>
          </div>

          {activeTab === 'profile' ? (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  />
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
                    Current Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <PricingSection />
              
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                  <h2 className="text-lg font-medium text-white">Billing History</h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-400">No billing history available</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;