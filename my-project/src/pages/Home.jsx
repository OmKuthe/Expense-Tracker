import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../assets/Sidebar';
const Home = () => {
    const totalSpent = 1200;
    const remainingBudget = 800;
    const recentTransactions = 5;
  
    const quotes = [
      "A penny saved is a penny earned. - Benjamin Franklin",
      "Beware of little expenses; a small leak will sink a great ship. - Benjamin Franklin",
      "Do not save what is left after spending, but spend what is left after saving. - Warren Buffett"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const DashboardCard = ({ title, value, change, positive = false }) => {
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div>
              <div className="text-gray-500 text-sm">{title}</div>
              <div className="text-2xl font-bold mt-1">{value}</div>
              {change && (
                <div className={`text-sm mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
                  {change}
                </div>
              )}
            </div>
          </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Simplified Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, John!</h1>
                    <p className="text-gray-600 italic">"{randomQuote}"</p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <DashboardCard 
                        title="Total Spent This Month" 
                        value={`$${totalSpent}`} 
                        change="-5% from last month"
                    />
                    <DashboardCard 
                        title="Remaining Budget" 
                        value={`$${remainingBudget}`} 
                        change="+10% remaining"
                        positive
                    />
                    <DashboardCard 
                        title="Recent Transactions" 
                        value={`${recentTransactions} today`}
                    />
                </div>

                {/* Simple Recent Transactions List */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between p-2 border-b">
                            <span>Grocery Store</span>
                            <span className="text-red-500">-$45.20</span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                            <span>Paycheck</span>
                            <span className="text-green-500">+$1,200.00</span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                            <span>Electric Bill</span>
                            <span className="text-red-500">-$85.75</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;