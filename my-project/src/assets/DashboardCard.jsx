import React from 'react';

const DashboardCard = ({ title, value, change, icon, positive = false }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div>
          <div className="text-gray-500 text-sm">{title}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
          <div className={`text-sm mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </div>
        </div>
        <div className="p-2 bg-gray-100 rounded-lg self-start">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;