
import Option from "@/models/Options";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string[] } }) {
    const { id } = params;


    try {
        const options = await Option.find({ poll: id }).populate({
            path: "votedUsers",
            select: "-_id username profile",
        });

        return NextResponse.json(options, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch poll data" }, { status: 400 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string[] } }) {
    const [optionId, userEmail] = params.id

    try {
        const user = await User.findOne({ email: userEmail });
        const updatedOption = await Option.findByIdAndUpdate(optionId, { $push: { votedUsers: user._id } }, { new: true }).populate({
            path: "votedUsers",
            select: "-_id username profile",
        });

        if (!updatedOption) {
            return NextResponse.json({ error: 'Option not found' }, { status: 404 });
          }

        return NextResponse.json(updatedOption, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update option" }, { status: 500 });
    }
}