import express from "express"
const router = express.Router();
import transaction from "../models/transaction.js";
import authenticate from "../middleware/auth.js";

router.get('/get',authenticate,async(req,res)=>{
try{
    const trans=await transaction.find({userId:req.user.id}).sort({date:-1});
    res.status(200).send(trans);
}catch(err){
    console.log(err);
    res.status(401).send("Error while getting transactions")
}
})

const get = router;
export default  get;