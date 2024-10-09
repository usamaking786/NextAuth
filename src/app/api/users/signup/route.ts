import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";
// NextRequest and NextResponse is used for getting the request and response from the server in nextjs

connectDb();

export async function POST(request: NextRequest) {
    const reqBody = await request.json();

    const {username, email, password} = reqBody;
    // Validation

    if(!username || !email || !password) {
    throw new Error("All fields are required");
    }

    // Check user already exist or not

    const userExist  = await User.findOne({
        $or:[{email},{username}]
    });

        if(userExist)
        {
            return NextResponse.json({error:"user already exist"})
        }

    // Password Hashing now to save it into the database. 

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

   const savedUser= await newUser.save();

    //    Now send verification Email

    sendEmail({email,emailType:"verify",userId:savedUser._id});

    return NextResponse.json({message:"user created successfully",
    success:true,
    savedUser
    });

}