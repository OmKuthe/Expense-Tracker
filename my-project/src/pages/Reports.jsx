import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../assets/Sidebar';
import axios from 'axios';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'ALL',
    category: 'ALL',
    startDate: '',
    endDate: ''
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const filteredTransactions = transactions.filter(txn => {
    return (
      (filters.type === 'ALL' || txn.Type === filters.type) &&
      (filters.category === 'ALL' || txn.Category === filters.category) &&
      (!filters.startDate || new Date(txn.formattedDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(txn.formattedDate) <= new Date(filters.endDate))
    );
  });
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch('http://localhost:3000/api/transactions/get', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch transactions');
      
      const data = await response.json();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const {userId} = useParams(); 
  console.log("User ID:", userId);
  const handleDelete = async () => {
    try {
      if (!userId) {
        alert("No user ID found!");
        return;
      }
      const response = await axios.delete(
        `http://localhost:3000/api/delete/${userId}`
      );
      alert(`Deleted transactions Sucessfully!`);
      setTransactions([]); 
    } catch (error) {
      alert('Delete failed: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;


  const categories = [...new Set(transactions.map(txn => txn.Category))];

  return (
    <div className="flex h-screen bg-gray-50">
    {/* Sidebar - fixed width */}
    <Sidebar />
    
    {/* Main content area - takes remaining space */}
    <div className="flex-1 overflow-auto">
      {/* Container with max width and padding */}
      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Transaction Reports</h1>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="ALL">All Types</option>
            <option value="CREDIT">Income</option>
            <option value="DEBIT">Expense</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="ALL">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        </div>
  
        {/* Transaction Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {/* Table Header - adjusted column spans */}
          <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-700">
            <div className="col-span-2">Date</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
  
          {/* Scrollable Transaction Container */}
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredTransactions.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredTransactions.map((txn) => (
                  <li 
                    key={txn._id} 
                    className={`grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors ${
                      txn.Type === "CREDIT" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <div className="col-span-2 text-gray-600">
                      {new Date(txn.formattedDate).toLocaleDateString()}
                    </div>
                    <div className="col-span-5 font-medium text-gray-800 truncate">
                      {txn.Details}
                    </div>
                    <div className="col-span-2 text-gray-600">
                      {txn.Category}
                    </div>
                    <div className="col-span-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.Type === "CREDIT" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {txn.Type}
                      </span>
                    </div>
                    <div className="col-span-2 text-right font-medium">
                      {txn.Type === "CREDIT" ? "+" : "-"}${txn.Amount.toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No transactions found matching your filters
              </div>
            )}
          </div>
        </div>
  
        {/* Export/Delete Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Export to CSV
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={transactions.length === 0}
          >
            Delete All Transactions
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Reports;