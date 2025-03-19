import  express, { request }  from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const mongourl=process.env.mongourl;
const PORT=process.env.PORT;


const app = express();
app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Hello OM");
})

mongoose.connect(mongourl).then(()=>{
    console.log("Database Connected Succesfully")
    app.listen(PORT,()=>{
        console.log(`App is listning on ${PORT}`);
    })
}).catch((err)=>{
    console.log("Failed to connect to Database");
    console.log(err);
})

