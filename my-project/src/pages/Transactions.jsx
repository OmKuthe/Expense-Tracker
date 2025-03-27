import {useState,useEffect} from 'react';

const Transactions = () => {
        const [transactions, setTransactions] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchTransactions = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/transactions/get');
              if (!response.ok) throw new Error('Failed to fetch');
              const data = await response.json();
              setTransactions(data);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchTransactions();
        }, []);
      
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
  return (
    <div>
   <div className="max-w-4xl mx-auto p-6">
  <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Transaction History</h1>
  
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {/* Table Header */}
    <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-700">
      <div className="col-span-3">Date</div>
      <div className="col-span-5">Description</div>
      <div className="col-span-2">Type</div>
      <div className="col-span-2 text-right">Amount</div>
    </div>

    {/* Scrollable Transaction Container */}
    <div className="max-h-[60vh] overflow-y-auto">
      <ul className="divide-y divide-gray-200">
        {transactions.map((txn) => (
          <li 
            key={txn._id} 
            className={`grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors ${
              txn.Type === "CREDIT" ? "text-green-600" : "text-red-600"
            }`}
          >
            <div className="col-span-3 text-gray-600">
              {new Date(txn.formattedDate).toLocaleDateString()}
            </div>
            <div className="col-span-5 font-medium text-gray-800 truncate">
              {txn.Details}
            </div>
            <div className="col-span-2">
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
    </div>
  </div>
</div>
    </div>
  )
}

export default Transactions
