import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
// NextRequest and NextResponse is used for getting the request and response from the server in nextjs

connectDb();

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json();
    
        const {token} = reqBody;
        console.log(token);
        
        if(!token){
            return NextResponse.json({error:"invalid token provided"});
        }
    
        // find user by token
        const user = await User.findOne({verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()},
        });
        
        if(!user){
            return NextResponse.json({error:"invalid token provided"});
        }
    
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
    
        return NextResponse.json({message:"email verified",
        status:201, 
    });
    
    } catch (error: any) {
        return NextResponse.json({message: "error found in Email Verification", status: 500,
        error: error.message,
    });
    }
}