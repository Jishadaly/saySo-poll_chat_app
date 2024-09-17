
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
        // Find the option by ID
    const option = await Option.findById(optionId);
    if (!option) {
        return NextResponse.json({ error: 'Option not found' }, { status: 404 });
    }

    // Check if the user already voted
    const hasVoted = option.votedUsers.includes(user._id);

    let updatedOption;

    if (hasVoted) {
        // User already voted, remove them from votedUsers and decrement the voteCount
        updatedOption = await Option.findByIdAndUpdate(
            optionId,
            {
                $pull: { votedUsers: user._id },
                $inc: { voteCount: -1 }
            },
            { new: true }
        ).populate({
            path: "votedUsers",
            select: "-_id username profile",
        });
    } else {
        // User hasn't voted, add them to votedUsers and increment the voteCount
        updatedOption = await Option.findByIdAndUpdate(
            optionId,
            {
                $push: { votedUsers: user._id },
                $inc: { voteCount: 1 }
            },
            { new: true }
        ).populate({
            path: "votedUsers",
            select: "-_id username profile email",
        });
    }

    // Fetch all options under the same poll
    const pollId = option.poll;
    const optionsInPoll = await Option.find({ poll: pollId });

    // Calculate total votes in the poll
    const totalVotes = optionsInPoll.reduce((acc, opt) => acc + opt.voteCount, 0);

    // Calculate percentage for each option and update them
    for (const opt of optionsInPoll) {
        const newPercentage = totalVotes > 0 ? Math.floor((opt.voteCount / totalVotes) * 100) : 0;
        await Option.findByIdAndUpdate(opt._id, { percentage: newPercentage });
    }
    

    // Return the updated option with its percentage
    const updatedWithPercentage = await Option.findById(optionId).populate({
        path: "votedUsers",
        select: "-_id username profile email"
    });

    return NextResponse.json(updatedWithPercentage, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update option" }, { status: 500 });
    }
}