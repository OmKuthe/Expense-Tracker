import React from 'react';
import Sidebar from '../assets/Sidebar';

const Profile = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-md p-6 max-w-md">
          {/* Profile Picture */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold mr-4">
              OM
            </div>
            <div>
              <h2 className="text-lg font-semibold">Om</h2>
              <p className="text-gray-500 text-sm">om@example.com</p>
            </div>
          </div>

          {/* Info Summary */}
          <div className="mb-4">
            <p><span className="font-medium">Joined:</span> Jan 2025</p>
            <p><span className="font-medium">Monthly Spend:</span> ₹12,340</p>
            <p><span className="font-medium">Budget Limit:</span> ₹15,000</p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm">Edit Profile</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
