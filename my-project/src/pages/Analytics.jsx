import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, LineChart, Line, CartesianGrid, ResponsiveContainer
} from 'recharts';
import Sidebar from '../assets/Sidebar';

const COLORS = [
  '#00B894', // Vibrant teal
  '#FF6B6B', // Bright coral
  '#6C5CE7', // Deep purple
  '#00CEC9', // Bright turquoise
  '#FDCB6E', // Vibrant yellow
  '#E84393'  // Pink
];

const dashboardData = {
  income: 50000,
  expenses: 35000,
  categories: [
    { name: 'Food', value: 10000 },
    { name: 'Rent', value: 12000 },
    { name: 'Transport', value: 4000 },
    { name: 'Entertainment', value: 5000 },
    { name: 'Utilities', value: 3000 },
    { name: 'Others', value: 1000 },
  ],
  monthlyTrends: [
    { month: 'Jan', income: 40000, expenses: 30000 },
    { month: 'Feb', income: 45000, expenses: 32000 },
    { month: 'Mar', income: 50000, expenses: 35000 },
    { month: 'Apr', income: 48000, expenses: 40000 },
  ],
  weeklyExpenses: [
    { day: 'Mon', expenses: 1500 },
    { day: 'Tue', expenses: 1000 },
    { day: 'Wed', expenses: 1200 },
    { day: 'Thu', expenses: 800 },
    { day: 'Fri', expenses: 2000 },
    { day: 'Sat', expenses: 2500 },
    { day: 'Sun', expenses: 1800 },
  ],
};

const Analytics = () => {
  const { income, expenses, categories, monthlyTrends, weeklyExpenses } = dashboardData;


  
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