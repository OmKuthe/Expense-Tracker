import mongoose from "mongoose";

const transactionschema=new mongoose.Schema({
    formattedDate:{type:Date,required:true},
    Details:{type:String,required:true},
    Type:{type:String,enum:["CREDIT","DEBIT"],required:true},
    Amount:{type:Number,required:true}
});
const transaction=mongoose.model('transaction',transactionschema);  
export default transaction;