// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchTransactions = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         throw new Error('Authentication required');
//       }

//       const response = await fetch('http://localhost:3000/api/transactions/get', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) throw new Error('Failed to fetch transactions');
      
//       const data = await response.json();
//       setTransactions(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('csvFile', file);

//     try {
//       setUploading(true);
//       setMessage('');
//       const token = localStorage.getItem('token');

//       if (!token) {
//         throw new Error('Please login first');
//       }

//       const uploadResponse = await fetch('http://localhost:3000/api/transactions/upload', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!uploadResponse.ok) {
//         const errorData = await uploadResponse.json();
//         throw new Error(errorData.message || 'Upload failed');
//       }

//       setMessage('File uploaded successfully!');
//       await fetchTransactions();
//     } catch (error) {
//       console.error('Upload error:', error);
//       setMessage(error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const {userId} = useParams(); 
//   console.log("User ID:", userId);
//   const handleDelete = async () => {
//     try {
//       if (!userId) {
//         alert("No user ID found!");
//         return;
//       }
//       const response = await axios.delete(
//         `http://localhost:3000/api/delete/${userId}`
//       );
//       alert(`Deleted transactions Sucessfully!`);
//       setTransactions([]); 
//     } catch (error) {
//       alert('Delete failed: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">CSV File Upload</h1>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Select CSV File
//             </label>
//             <input
//               type="file"
//               accept=".csv"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//             />
//           </div>
          
//           <button
//             onClick={handleUpload}
//             disabled={uploading}
//             className={`w-full py-2 px-4 rounded-md text-white font-medium ${uploading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
//           >
//             {uploading ? 'Uploading...' : 'Upload'}
//           </button>
          
//           {message && (
//             <p className={`text-sm mt-2 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//       <div>
//         <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Transaction History</h1>
        
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {/* Table Header */}
//           <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-700">
//             <div className="col-span-3">Date</div>
//             <div className="col-span-5">Description</div>
//             <div className="col-span-2">Type</div>
//             <div className="col-span-2 text-right">Amount</div>
//           </div>

//           {/* Scrollable Transaction Container */}
//           <div className="max-h-[60vh] overflow-y-auto">
//             <ul className="divide-y divide-gray-200">
//               {transactions.map((txn) => (
//                 <li 
//                   key={txn._id} 
//                   className={`grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors ${
//                     txn.Type === "CREDIT" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   <div className="col-span-3 text-gray-600">
//                     {new Date(txn.formattedDate).toLocaleDateString()}
//                   </div>
//                   <div className="col-span-5 font-medium text-gray-800 truncate">
//                     {txn.Details}
//                   </div>
//                   <div className="col-span-2">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       txn.Type === "CREDIT" 
//                         ? "bg-green-100 text-green-800" 
//                         : "bg-red-100 text-red-800"
//                     }`}>
//                       {txn.Type}
//                     </span>
//                   </div>
//                   <div className="col-span-2 text-right font-medium">
//                     {txn.Type === "CREDIT" ? "+" : "-"}${txn.Amount.toFixed(2)}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//     <button
//       onClick={handleDelete}
//       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//     >
//       Delete My Transactions
//     </button>
//     </div>
//   );
// };

// export default Dashboard;

// <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//           <select
//             name="type"
//             // value={filters.type}
//             onChange={handleFilterChange}
//             className="w-full p-2 border rounded-md"
//           >
//             <option value="ALL">All Types</option>
//             <option value="CREDIT">Income</option>
//             <option value="DEBIT">Expense</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleFilterChange}
//             className="w-full p-2 border rounded-md"
//           >
//             <option value="ALL">All Categories</option>
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
//           <input
//             type="date"
//             name="startDate"
//             value={filters.startDate}
//             onChange={handleFilterChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
//           <input
//             type="date"
//             name="endDate"
//             value={filters.endDate}
//             onChange={handleFilterChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
//       </div>
