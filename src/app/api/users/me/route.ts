import { connectDb } from "@/dbConfig/dbConfig";
import { getDetailsFromToken } from "@/helpers/getdetailsfromtoken";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
  try {
    // Get details from the token
    const userId = getDetailsFromToken(request);

    // Find user
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found in me" });
    }

    return NextResponse.json({
      message: "User has been found",
      data: user,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
