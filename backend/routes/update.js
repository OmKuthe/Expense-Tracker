import express from "express";
import bcrypt from "bcryptjs";
import {Users} from "../models/userModel.js";
const router = express.Router();


router.put('/update/:id',async (req,res)=>{
    try{
        const userid=req.params.id;
        if(!userid){
            res.status(401).send({message:"User Id required"});
        }
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
          return res.status(400).json({ message: "Current and new password are required" });
        }
    
        const user = await Users.findById(userid);
        if (!user) return res.status(404).json({ message: "User not found" });
    
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });
    
        user.password = newPassword;
        await user.save();
    
        res.status(200).json({ message: "Password updated successfully" });
    }catch(err){
        console.error("Password updation error:", err);
        return res.status(500).send({ 
            message: "Internal server error",
            error: err.message 
        });;
    }
})

const updatePass = router;
export default updatePass;