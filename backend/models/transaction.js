import mongoose from "mongoose";

const transactionschema=new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    formattedDate:{type:Date,required:true},
    Details:{type:String,required:true},
    Type:{type:String,enum:["CREDIT","DEBIT"],required:true},
    Amount:{type:Number,required:true}
});
const transaction=mongoose.model('transaction',transactionschema);  
export default transaction;