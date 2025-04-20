import { express } from "express";
const router=express.Router();
import transaction from "../models/transaction.js";
import authenticate from "../middleware/auth.js";

router.get('/fetch',authenticate,async(req,res)=>{
    try {
        const userId = req.userData.userId;
        
        const categoryData = await transaction.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
              type: 'DEBIT' 
            }
          },
          {
            $group: {
              _id: '$category',
              total: { $sum: '$amount' }
            }
          },
          {
            $project: {
              name: '$_id',
              value: '$total',
              _id: 0
            }
          },
          { $sort: { value: -1 } }
        ]);
    
        res.json(categoryData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    }
)
    
const fetch = router;
export default  fetch;