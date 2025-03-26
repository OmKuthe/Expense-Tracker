import express from "express"
const router = express.Router();
import transaction from "../models/transaction.js";

router.get('/get',async(req,res)=>{
try{
    const trans=await transaction.find().sort({date:-1});
    res.status(200).send(trans);
}catch(err){
    console.log(err);
    res.status(401).send("Error while getting transactions")
}
})

export default  router;