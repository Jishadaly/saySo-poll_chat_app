import Pusher from 'pusher';


const NEXT_PUBLIC_PUSHER_KEY = "a11ad6345f89215d641d"
const NEXT_PUBLIC_PUSHER_CLUSTER = "ap2"
const PUSHER_APP_ID = "1864332"
const PUSHER_APP_SECRET = "c5b5701a3c858ca466e1"

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || PUSHER_APP_ID,
  key: process.env.PUSHER_KEY || NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET || PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER || NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true
});


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


    await pusher.trigger('poll-channel', 'new-message',{
      poll:pollId,
      text:savedMessage.text,
      user:{
        username:user.username,
        email:user.email,
        profile:user.profile
      }
    })  

    console.log(savedMessage);
    return NextResponse.json({ message: "Message saved successfully", savedMessage }, { status: 200 });

  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
