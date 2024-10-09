import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
},{
    timestamps:true,
});

// Because nextJs is the edge time Framework.
// So we need to create a model. and if model created it will create a collection.

export const User = mongoose.models["users"] || mongoose.model("users",userSchema);
