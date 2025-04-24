import express from "express";
import mongoose from "mongoose";
import { Users } from "../models/userModel.js";
const router = express.Router();

router.delete('/deleteProfile/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: "Invalid User ID" });
        }

        const result = await Users.deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.status(200).send({ message: "User deleted successfully" });

    } catch (err) {
        console.error("Delete error:", err);
        return res.status(500).send({ 
            message: "Internal server error",
            error: err.message 
        });
    }
});

const deleteProfile = router;
export default deleteProfile;