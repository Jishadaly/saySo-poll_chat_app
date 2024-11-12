import { NextRequest, NextResponse } from "next/server";
import pusher from "@/lib/pusherServer";



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