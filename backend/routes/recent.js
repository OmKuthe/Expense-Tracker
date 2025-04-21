import express from 'express';
import Transaction from '../models/transaction.js';
import mongoose from 'mongoose';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Recent transactions endpoint
router.get('/recent', authenticate, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Get recent 5 transactions sorted by date (newest first)
    const recentTransactions = await Transaction.aggregate([
      { $match: { userId } },
      { $sort: { formattedDate: -1 } }, // Sort by newest first
      { $limit: 5 }, // Limit to 5 transactions
      {
        $project: {
          _id: 0, // Exclude _id
          id: '$_id', // Rename _id to id
          amount: '$Amount',
          type: '$Type',
          category: '$category',
          date: '$formattedDate',
          description: '$Details'
        }
      }
    ]);

    // Convert type to lowercase for frontend consistency
    const formattedTransactions = recentTransactions.map(tx => ({
      ...tx,
      type: tx.type.toLowerCase() // 'CREDIT' -> 'credit', 'DEBIT' -> 'debit'
    }));

    res.json(formattedTransactions);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    res.status(500).json({ message: 'Server error while fetching recent transactions' });
  }
});

// Your existing summary endpoint
router.get('/summary', authenticate, async (req, res) => {
  // ... (keep your existing summary implementation)
});

const recent=router;
export default recent;