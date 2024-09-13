import Message from "@/models/Message";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  console.log("here ");
  
  try {
    const body = await req.json();
    const { message, email, pollId } = body;

    if (!message || !email || !pollId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const savedMessage = await Message.create({
      poll: pollId,
      text: message,
      user: user._id
    });
    
    console.log(savedMessage);
    return NextResponse.json({ message: "Message saved successfully", savedMessage }, { status: 200 });

  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
