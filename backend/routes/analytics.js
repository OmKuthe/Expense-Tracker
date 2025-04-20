import express from 'express';
import transaction from '../models/transaction.js';
import mongoose from 'mongoose';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Single endpoint for all analytics data
router.get('/summary', authenticate, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Get all data in parallel
    const [totals, monthlyData, weeklyData, categories] = await Promise.all([
      // 1. Total income and expenses
      transaction.aggregate([
        { $match: { userId } },
        { 
          $group: { 
            _id: '$Type',
            total: { $sum: '$Amount' } 
          } 
        }
      ]),

      // 2. Monthly trends
      transaction.aggregate([
        { 
          $match: { 
            userId,
            Type: { $in: ['CREDIT', 'DEBIT'] } 
          } 
        },
        {
          $group: {
            _id: {
              month: { $month: '$formattedDate' },
              type: '$Type'
            },
            total: { $sum: '$Amount' }
          }
        }
      ]),

      // 3. Weekly expenses
      transaction.aggregate([
        { 
          $match: { 
            userId,
            Type: 'DEBIT' 
          } 
        },
        {
          $group: {
            _id: { $dayOfWeek: '$formattedDate' },
            expenses: { $sum: '$Amount' }
          }
        }
      ]),

      // 4. Expense categories
      transaction.aggregate([
        { 
          $match: { 
            userId,
            Type: 'DEBIT' 
          } 
        },
        {
          $group: {
            _id: '$category',
            total: { $sum: '$Amount' }
          }
        },
        { $sort: { total: -1 } }
      ])
    ]);

    // Process data
    const response = {
      income: totals.find(t => t._id === 'CREDIT')?.total || 0,
      expenses: totals.find(t => t._id === 'DEBIT')?.total || 0,
      monthlyTrends: [1, 2, 3, 4].map(month => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr'][month-1],
        income: monthlyData
          .filter(m => m._id.month === month && m._id.type === 'CREDIT')
          .reduce((sum, m) => sum + m.total, 0),
        expenses: monthlyData
          .filter(m => m._id.month === month && m._id.type === 'DEBIT')
          .reduce((sum, m) => sum + m.total, 0)
      })),
      weeklyExpenses: [1, 2, 3, 4, 5, 6, 7].map(day => ({
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day-1],
        expenses: weeklyData.find(w => w._id === day)?.expenses || 0
      })),
      categories: categories.map(cat => ({
        name: cat._id,
        value: cat.total
      }))
    };

    res.json(response);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const summary=router;
export default summary;