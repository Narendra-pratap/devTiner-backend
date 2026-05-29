const express=require("express");
const app=express();
const connectDB=require("./config/database");
connectDB().then(()=>{
    console.log("database connected successfull");
    app.listen(3000,()=>{
    console.log("server is listning on port 30000");
})
}).catch((err)=>{
    console.log("ERROR:",err.message);
})
app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})
