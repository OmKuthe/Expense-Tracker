import React, { useState } from 'react';
import { Info, FileText, LogOut } from 'lucide-react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: JSON.parse(localStorage.getItem('user'))?.user || 'User',
    language: 'en',
    notifications: true,
  });
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [showTnC, setShowTnC] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: User Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
            {formData.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold mb-1 dark:text-white">{formData.name}</h2>  
            <div className="w-full border-t pt-4 dark:border-gray-700">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">App Usage</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-indigo-500 h-2.5 rounded-full" 
                  style={{ width: '75%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">75% of features explored</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="space-y-6">
            <div
              onClick={() => setShowAbout(true)}
              className="cursor-pointer flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="font-semibold text-lg dark:text-white">About Us</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Learn about our mission</p>
              </div>
              <Info className="text-blue-500" />
            </div>

            <div
              onClick={() => setShowTnC(true)}
              className="cursor-pointer flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="font-semibold text-lg dark:text-white">Terms & Conditions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Read our policy</p>
              </div>
              <FileText className="text-green-500" />
            </div>

            <div 
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }
              }}
              className="cursor-pointer flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="font-semibold text-lg dark:text-white">Logout</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Securely exit</p>
              </div>
              <LogOut className="text-red-500" />
            </div>
          </div>
        </div>

        {/* About Us Modal */}
        {showAbout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-2xl max-h-[80%] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 dark:text-white">About Expense Tracker</h2>
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  Our mission is to simplify personal finance management for everyone. 
                  We believe tracking expenses should be effortless and insightful.
                </p>
                <p>
                  Founded in 2023, our team of financial experts and designers created this app 
                  to help people gain better control over their spending habits.
                </p>
                <h3 className="font-semibold text-base mt-4 dark:text-white">Key Features:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Intuitive expense categorization</li>
                  <li>Real-time spending analytics</li>
                  <li>Cross-device synchronization</li>
                  <li>Bank-level security</li>
                </ul>
              </div>
              <div className="text-right mt-6">
                <button 
                  onClick={() => setShowAbout(false)} 
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Terms & Conditions Modal */}
        {showTnC && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-2xl max-h-[80%] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Terms & Conditions</h2>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Welcome to Expense Tracker. By accessing our service, you agree to these terms.
                </p>
                <h3 className="font-semibold text-base dark:text-white">1. Account Responsibility</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account and password.
                </p>
                <h3 className="font-semibold text-base dark:text-white">2. Data Usage</h3>
                <p>
                  We use your financial data solely to provide our services and never sell it to third parties.
                </p>
                <h3 className="font-semibold text-base dark:text-white">3. Service Limitations</h3>
                <p>
                  While we strive for accuracy, we cannot guarantee uninterrupted or error-free service.
                </p>
              </div>
              <div className="text-right mt-6">
                <button 
                  onClick={() => setShowTnC(false)} 
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;