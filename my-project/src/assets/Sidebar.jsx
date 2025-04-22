
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?.userId;
  const name = userData.user;
  console.log("Id:",userId);
  console.log(userData);

  return (
    <div className="w-64 bg-indigo-700 text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">ExpenseTracker</h1>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to={`/home/${userId}`} className="block">Home</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to={`/analytics/${userId}`} className="block">Analytics</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to={`/add/${userId}`} className="block">Add Transaction</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to={`/reports/${userId}`} className="block">Reports</Link>
          </li>
          <li className="p-2 hover:bg-indigo-600 rounded-lg">
            <Link to={`/settings/${userId}`} className="block">Settings</Link>
          </li>
        </ul>
      </nav>
      
      <div className="flex items-center p-2 mt-auto hover:bg-indigo-600 rounded-lg">
        <Link to={`/profile/${userId}`} className="flex items-center w-full">
        <div className="w-8 h-8 rounded-full bg-indigo-500 mr-3 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"
            />
          </svg>
          </div>
          <span>{name}</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;