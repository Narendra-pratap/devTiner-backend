const mongoose=require("mongoose");
const connectDB=async()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/devTinder");
}
module.exports=connectDB;