import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const response =  NextResponse.json({message:"user logged out", success:true});
        response.cookies.set("token","",{
            httpOnly: true, expires: new Date(0),
        })
        return response;
    } catch (error:any) {
        return NextResponse.json(error.message)
    }
}

