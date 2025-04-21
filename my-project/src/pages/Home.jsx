import React, { useState, useEffect } from 'react';
import Sidebar from '../assets/Sidebar';

const Home = () => {
  const [data, setData] = useState({
    income: 0,
    expenses: 0,
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const quotes = [
    "A penny saved is a penny earned. - Benjamin Franklin",
    "Beware of little expenses; a small leak will sink a great ship. - Benjamin Franklin",
    "Do not save what is left after spending, but spend what is left after saving. - Warren Buffett",
    "Financial freedom is available to those who learn about it and work for it. - Robert Kiyosaki",
    "The art is not in making money, but in keeping it. - Proverb"
  ];
  const [randomQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        
        const [summaryRes, transactionsRes] = await Promise.all([
          fetch('http://localhost:3000/api/transactions/summary', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:3000/api/transactions/recent', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        if (!summaryRes.ok || !transactionsRes.ok) throw new Error('Failed to fetch data');
        
        const summary = await summaryRes.json();
        const transactions = await transactionsRes.json();
        
        setData({
          income: summary.income,
          expenses: summary.expenses,
          recentTransactions: transactions
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  const { income, expenses, recentTransactions } = data;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {JSON.parse(localStorage.getItem('user'))?.name || 'User'}!
          </h1>
          <p className="text-gray-600 italic">"{randomQuote}"</p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
            <h3 className="text-gray-500 font-medium">Total Income</h3>
            <p className="text-2xl font-bold mt-2 text-blue-600">
              {formatCurrency(income)}
            </p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-500">
            <h3 className="text-gray-500 font-medium">Total Expenses</h3>
            <p className="text-2xl font-bold mt-2 text-red-600">
              {formatCurrency(expenses)}
            </p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {transaction.type === 'income' ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{transaction.category}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;