import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../assets/Sidebar";
const Add = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      setUploading(true);
      setMessage('');
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) {
        throw new Error('Please login first');
      }

      const uploadResponse = await fetch('http://localhost:3000/api/transactions/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      setMessage('File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  const [manualData, setManualData] = useState({
    Details: '',
    Amount: '',
    date: '',
    category: '',
    Type: 'DEBIT' 
  });

  const { userId } = useParams();

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const transactionData = {
        formattedDate: manualData.date || new Date().toISOString().split('T')[0],
        category: manualData.category || "Uncategorized",
        Details: manualData.Details,
        Type: manualData.Type,
        Amount: manualData.Amount
      };
      
      console.log('Submitting transaction:', transactionData);
      const response = await fetch(`http://localhost:3000/api/putone/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit transaction');
      }

      const result = await response.json();
      console.log('Transaction successful:', result);
      alert('Transaction added successfully!');
      
      setManualData({
        Details: '',
        Amount: '',
        date: '',
        category: '',
        Type: 'DEBIT'
      });
    } catch (error) {
      console.error('Transaction submission error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  
  return (
    <div className="flex">
      <Sidebar />
      
      <div className="min-h-screen bg-gray-50 flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* CSV Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">CSV File Upload</h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  uploading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                {uploading ? 'Uploading...' : 'Upload CSV'}
              </button>
              
              {message && (
                <p className={`text-sm mt-2 ${
                  message.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Manual Transaction Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Transaction Manually</h2>
            
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={manualData.Details}
                  onChange={(e) => setManualData({...manualData, Details: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={manualData.Amount}
                    onChange={(e) => setManualData({...manualData, Amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={manualData.date}
                    onChange={(e) => setManualData({...manualData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={manualData.category}
                  onChange={(e) => setManualData({...manualData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={manualData.Type}
                  onChange={(e) => setManualData({...manualData, Type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="DEBIT">DEBIT</option>
                  <option value="CREDIT">CREDIT</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;