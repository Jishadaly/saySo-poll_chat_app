
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IPoll } from '@/types/poll';
import { usePolls } from '@/context/PollContext';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)


const timeAgo = new TimeAgo('en-EN')

interface PollListProps {
    initalPolls: IPoll[];
    setSelectedPollId: (id: string) => void; // Function to update the selected poll ID
}

export default function PollList({ initalPolls, setSelectedPollId }: PollListProps) {
    const { polls ,addPoll } = usePolls();
    const handlePollClick = (id:string)=>{
        alert(id)
    }

    useEffect(()=>{
        initalPolls.map((poll)=>  addPoll(poll))
    },[initalPolls , addPoll]);

    return (
        <div className="bg-background border-r w-full md:w-64 p-4 overflow-auto">
            <div className="text-sm font-medium mb-2">Active Polls</div>
            <div className="space-y-2">
                {polls.map((poll) => (

                

                    <div  key={poll._id} onClick={() => setSelectedPollId(poll._id) } className="block p-2 rounded-md hover:bg-muted transition-colors" >
                        <div className="font-medium">{poll.question}</div>
                        <div className="text-xs text-muted-foreground">{ poll.totalVotes ? poll.totalVotes :  0 } votes • { poll.createdAt ? timeAgo.format(new Date(poll.createdAt).getTime() - 60 * 1000 ) : 'dummy time ago '}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}


// Should we switch to a 4-day work week?