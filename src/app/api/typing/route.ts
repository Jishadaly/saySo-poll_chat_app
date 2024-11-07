import { NextRequest, NextResponse } from "next/server";
import pusher from "@/lib/pusherServer";

// const NEXT_PUBLIC_PUSHER_KEY = "a11ad6345f89215d641d"
// const NEXT_PUBLIC_PUSHER_CLUSTER = "ap2"
// const PUSHER_APP_ID = "1864332"
// const PUSHER_APP_SECRET = "c5b5701a3c858ca466e1"

// // Initialize Pusher
// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID || PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY || NEXT_PUBLIC_PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET || PUSHER_APP_SECRET,
//   cluster: process.env.PUSHER_CLUSTER || NEXT_PUBLIC_PUSHER_CLUSTER,
//   useTLS: true
// });

export async function POST(req:NextRequest , res:NextResponse){
   
        const body = await req.json();
        const { email , name , pollId } :{ email:string , name:string , pollId:string  } = body;
        
        await pusher.trigger('poll-channel','user-typing',{
            email,
            name,
            pollId
        });

        return NextResponse.json({message:'typing event broadcasted'},{status:200});
}