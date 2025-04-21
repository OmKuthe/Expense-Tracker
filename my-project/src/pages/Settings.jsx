import React, { useState } from 'react';
import Sidebar from '../assets/Sidebar';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: JSON.parse(localStorage.getItem('user'))?.name || 'User',
    currency: 'INR'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage or API
    const user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...user, name: formData.name }));
    alert('Settings saved!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-md">
          <form onSubmit={handleSubmit}>
            {/* Only essential fields */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>

          {/* Only critical additional action */}
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }
              }}
              className="w-full py-2 text-red-600 border border-red-500 rounded-lg hover:bg-red-50"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;