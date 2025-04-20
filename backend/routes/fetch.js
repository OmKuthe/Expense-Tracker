import express from 'express';
import  transaction  from '../models/transaction.js';
import mongoose from 'mongoose';
import authenticate from '../middleware/auth.js';

const router = express.Router();

router.get('/fetch', authenticate, async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.user._id);
      
      // Debug: Verify the user ID being used
      console.log(`Fetching data for user: ${userId}`);
  
      const rawData = await transaction.aggregate([
        {
          $match: {
            userId: userId, // This ensures only current user's data
            Type: 'DEBIT'
          }
        },
        {
          $group: {
            _id: '$category',
            total: { $sum: '$Amount' }
          }
        }
      ]);
  
      // Debug: Verify raw results
      console.log('Raw user-specific data:', rawData);
  
      // Return actual categories from DB for this user
      const result = rawData.map(item => ({
        name: item._id,
        value: item.total
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        error: 'Server error',
        details: error.message
      });
    }
  });
const fetch =router;
export default fetch;