const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:50,
        lowercase:true,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        lowercase:true,
        trim:true
    },
    emailId:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        },
        unique:true
        
    },
   password:{
        type:String,
        required:true,
        validate:(value)=>{
            if(!validator.isStrongPassword(value)){
                throw new Error("eneter a strong password");
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:100

    },
    about:{
        type:String,
        default:`Welcome to my profile`
    },
    photoUrl:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png",
        validate:(value)=>{
            if(!validator.isURL(value)){
                throw new Error("photo url is not valid");
            }
        }
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length>10){
                throw new Error("Skills cannot exceed 10")
            }
        }
    },
    gender:{
        type:String,
        enum:["male","female","others"]
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema);
module.exports =User;