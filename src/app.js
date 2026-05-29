const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})
app.listen(3000,()=>{
    console.log("server is listning on port 30000");
})