import Poll from "@/models/Poll";
import { NextRequest, NextResponse } from "next/server";
import Option from "@/models/Options";
import { Types } from "mongoose";

export async function POST(req: NextRequest, res: NextResponse ) {
    
    const body = await req.json();
    const { question, options }: { question: string, options: string[] } = body;

    try {
        
        const newPoll = await Poll.create({
            question,
            options: [],
        });

        const createdOptions: Types.ObjectId[] = await Promise.all(
            options.map(async (text: string): Promise<Types.ObjectId> => {
                const option = await Option.create({
                    text,
                    poll: newPoll._id
                })

                return option._id as Types.ObjectId;
            })
        )

        newPoll.options = createdOptions;
        const savedPoll = await newPoll.save();
        console.log("donne",createdOptions);

        return NextResponse.json(savedPoll,{status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Server error', error },{status:500})

    }


}

export async function GET(req: Request) {
    try {
      const polls = await Poll.find();  // Fetch polls from the database
      return NextResponse.json(polls, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch polls" }, { status: 500 });
    }
  }
