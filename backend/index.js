import  express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import transactionroute from "./routes/transactionroute.js"
import get from "./routes/getalltrans.js";
import cors from 'cors'
import signup from "./routes/Signup.js";
import login from "./routes/Login.js";
import delete_all from "./routes/delete.js";
import putone from "./routes/putone.js";
import fetch from "./routes/fetch.js";
import summary from "./routes/analytics.js";

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

app.use('/api/transactions',get);

app.use('/api',signup);

app.use('/api',login);

app.use('/api',delete_all);

app.use('/api',putone);

app.use('/api/transactions',fetch);

app.use('/api/transactions',summary);