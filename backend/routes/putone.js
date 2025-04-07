import express, { response } from "express";
import transaction from "../models/transaction.js";
const router=express.Router();
import mongoose from "mongoose";
import { Users } from "../models/userModel.js";



router.post('/putone/:userId', async (req, res) => {
    try {
        let userId;
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
                return res.status(400).json({ 
                    message: "Invalid user ID format",
                    details: "Must be a 24-character hex string"
                });
            }
            userId = new mongoose.Types.ObjectId(req.params.userId);
        } catch (err) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await mongoose.model('Users').findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const transactionData = {
            userId,
            formattedDate: new Date(req.body.formattedDate),
            category: req.body.category || "Uncategorized",
            Details: req.body.Details,
            Type: req.body.Type,
            Amount: req.body.Amount
        };
        const Transaction = mongoose.model('transaction');
        const trans = new Transaction(transactionData);
        await trans.validate();

        const savedTrans = await trans.save();
        return res.status(201).json(savedTrans);

    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(500).json({ 
            message: "Server error",
            error: process.env.NODE_ENV === "development" ? error.message : undefined
        });
    }
});

const putone=router
export default putone