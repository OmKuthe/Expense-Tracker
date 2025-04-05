
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-indigo-700 text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">ExpenseTracker</h1>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to="/home" className="block">Home</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to="/dashboard" className="block">Dashboard</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to="/analytics" className="block">Analytics</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to="/add-transaction" className="block">Add Transaction</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to="/reports" className="block">Reports</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to="/settings" className="block">Settings</Link>
          </li>
        </ul>
      </nav>
      
      <div className="flex items-center p-2 mt-auto hover:bg-indigo-600 rounded-lg">
        <Link to="/profile" className="flex items-center w-full">
          <div className="w-8 h-8 rounded-full bg-indigo-500 mr-3"></div>
          <span>John Doe</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;