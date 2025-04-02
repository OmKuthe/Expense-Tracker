import express from "express";
import mongoose from "mongoose";
import transaction from "../models/transaction.js";
const router = express.Router();


router.delete('/delete/:id',async (request,response)=>{
    try{
        const userid=request.params.id;
        if(!userid){
            response.status(401).send({message:"User Id required"});
        }
        const result = await transaction.deleteMany({ userId: new mongoose.Types.ObjectId(userid) });
        if(!result){
            return response.status(404).send({message:"transactions deletion failed"});
        }else if (result.deletedCount==0){
            return response.status(402).send({message:"No transactions found"});
        }else{
            return response.status(200).send({message:"transactions deleted succesfully"});
        }
    }catch(err){
        console.error("Delete error:", err);
        return response.status(500).send({ 
            message: "Internal server error",
            error: err.message 
        });;
    }
})

const delete_all = router;
export default delete_all;