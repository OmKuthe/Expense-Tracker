import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, LineChart, Line, CartesianGrid, ResponsiveContainer
} from 'recharts';
import Sidebar from '../assets/Sidebar';

const COLORS = ['#00B894', '#FF6B6B', '#6C5CE7', '#00CEC9', '#FDCB6E', '#E84393'];

const Analytics = () => {
  const [formData, setFormData] = useState({
    name: JSON.parse(localStorage.getItem('user'))?.user || 'User',
    language: 'en',
    notifications: true,
  });
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [data, setData] = useState({
    income: 0,
    expenses: 0,
    categories: [],
    monthlyTrends: [],
    weeklyExpenses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        const response = await fetch('http://localhost:3000/api/transactions/summary', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  // Destructure data for cleaner JSX
  const { income, expenses, categories, monthlyTrends, weeklyExpenses } = data;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
        <Sidebar />


      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Financial Analytics</h1>
          <p className="text-gray-600">Track your income and expenses</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#00B894]">
            <h3 className="text-gray-500 font-medium">Total Income</h3>
            <p className="text-2xl font-bold mt-2">₹{income.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#FF6B6B]">
            <h3 className="text-gray-500 font-medium">Total Expenses</h3>
            <p className="text-2xl font-bold mt-2">₹{expenses.toLocaleString()}</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expenses Pie */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Income', value: income },
                      { name: 'Expenses', value: expenses }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    dataKey="value"
                  >
                    <Cell fill={COLORS[0]} />
                    <Cell fill={COLORS[1]} />
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    dataKey="value"
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke={COLORS[0]} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke={COLORS[1]} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Expenses */}
          <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Weekly Expenses</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="expenses" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;