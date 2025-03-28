import  express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import transactionroute from "./routes/transactionroute.js"
import router from "./routes/getalltrans.js";
import cors from 'cors'

dotenv.config();
const mongourl=process.env.mongourl;
const PORT=process.env.PORT;


const app = express();
app.use(express.json());
app.use(cors());

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

app.use('/api/transactions',transactionroute);

app.use('/api/transactions',router);