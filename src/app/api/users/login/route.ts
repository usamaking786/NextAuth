import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// NextRequest and NextResponse is used for getting the request and response from the server in nextjs

connectDb();

export async function POST(request: NextRequest) {
    try {
    const reqBody = await request.json();
    const {email, password} = reqBody;
    console.log(reqBody);
    
    // Find User
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({message : "User not found in login", status: 404});
    }
    console.log("user existed");

    // Compare Password
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return NextResponse.json({message : "Invalid Password"});
    }
    console.log("password matched");

    // JWT creation

    const tokenData = {
        id:user._id,
        email:user.email,
        username:user.username
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{ expiresIn: '1d' });

    const response = NextResponse.json({message : "Login Success", success:true});

response.cookies.set("token", token, {
    httpOnly: true,
})

return response;

} catch (error : any) {
    return NextResponse.json({message : "Login erros", error:error.message});
}
}