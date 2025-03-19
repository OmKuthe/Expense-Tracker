import  express, { request }  from "express";
const PORT=3000;

const app = express();
app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Hello OM");
})

app.listen(PORT,()=>{
    console.log(`App is listning on ${PORT}`);
})
