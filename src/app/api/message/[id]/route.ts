
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } } ) {
    const { id } = params;

    try {
        const pollData = await Message.find({ poll: id }).populate({
            path: "user",
            select: "-_id",
        });
       
        return NextResponse.json(pollData, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch poll data" }, { status: 400 });
    }
}
