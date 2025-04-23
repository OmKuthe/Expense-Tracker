import React, { useState, useEffect } from 'react';
import Sidebar from '../assets/Sidebar';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: JSON.parse(localStorage.getItem('user'))?.user || 'User',
    email: JSON.parse(localStorage.getItem('user'))?.email || '',
    language: 'en',
    notifications: true,
    profilePicture: ''
  });
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          profilePicture: event.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ 
      ...user, 
      user: formData.name,
      email: formData.email,
      settings: {
        language: formData.language,
        notifications: formData.notifications,
        profilePicture: formData.profilePicture
      }
    }));
    alert('Settings saved!');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Save Changes
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Profile</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4">
                <img 
                  src={formData.profilePicture || 'https://via.placeholder.com/96'} 
                  alt="Profile" 
                  className="rounded-full w-full h-full object-cover border-2 border-gray-200 dark:border-gray-600"
                />
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </label>
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-white">{formData.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formData.email}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`px-4 py-2 rounded-lg border ${!darkMode ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-700' : 'border-gray-300 dark:border-gray-600'}`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-700' : 'border-gray-300 dark:border-gray-600'}`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">Email Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">Push Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Account</h2>
              
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-gray-600">
                  Change Password
                </button>
                
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-gray-600">
                  Delete Account
                </button>
                
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to log out?')) {
                      localStorage.removeItem('user');
                      window.location.href = '/';
                    }
                  }}
                  className="w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 border border-red-500 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;