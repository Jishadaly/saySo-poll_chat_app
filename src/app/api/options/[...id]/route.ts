
import Option from "@/models/Options";
import Poll from "@/models/Poll";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Pusher from 'pusher';

const NEXT_PUBLIC_PUSHER_KEY = "a11ad6345f89215d641d"
const NEXT_PUBLIC_PUSHER_CLUSTER = "ap2"
const PUSHER_APP_ID = "1864332"
const PUSHER_APP_SECRET = "c5b5701a3c858ca466e1"

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || PUSHER_APP_ID,
    key: process.env.PUSHER_KEY || NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET || PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_CLUSTER || NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true
});

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
        
        const option = await Option.findById(optionId);
        if (!option) {
            return NextResponse.json({ error: 'Option not found' }, { status: 404 });
        }

        const pollId = option.poll;
        const poll = await Poll.findById(pollId);
        const hasVoted = option.votedUsers.includes(user._id);
        let updated = 0;
        
        
        let updatedOption;

        if (hasVoted) {

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
            
            updated = poll.totalVotes - 1;
        } else {

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

            updated = poll.totalVotes + 1;

        }

        const updatedPoll = await Poll.findByIdAndUpdate(pollId, { totalVotes: updated }, { new: true });
        
        const optionsInPoll = await Option.find({ poll: pollId });
        const totalVotes = optionsInPoll.reduce((acc, opt) => acc + opt.voteCount, 0);

        const updatedOptions = await Promise.all(optionsInPoll.map(async (opt) => {
            const newPercentage = totalVotes > 0 ? Math.floor((opt.voteCount / totalVotes) * 100) : 0;
            return await Option.findByIdAndUpdate(opt._id, { percentage: newPercentage }, { new: true })
                .populate({
                    path: "votedUsers",
                    select: "-_id username profile"
                });
        }));

        await pusher.trigger('poll-channel', 'poll-update', {
            poll: pollId,
            options: updatedOptions,

        });

        return NextResponse.json(updatedOptions, { status: 200 });
        
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: "Failed to update option" }, { status: 500 });
    }
}