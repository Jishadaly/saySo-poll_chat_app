
// import Link from 'next/link'
// import React, { useEffect } from 'react'
// import { IPoll } from '@/types/poll';
// import { usePolls } from '@/context/PollContext';
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addLocale(en)


// const timeAgo = new TimeAgo('en-EN')

// interface PollListProps {
//     initalPolls: IPoll[];
//     setSelectedPollId: (id: string) => void; // Function to update the selected poll ID
// }

// export default function PollList({ initalPolls, setSelectedPollId }: PollListProps) {
//     const { polls ,addPoll } = usePolls();
//     const handlePollClick = (id:string)=>{
//         alert(id)
//     }

//     useEffect(()=>{
//         initalPolls.map((poll)=>  addPoll(poll))
//     },[initalPolls , addPoll]);

//     return (
//         <div className="bg-background border-r w-full md:w-96 p-4 overflow-auto">
//             <div className="text-sm font-medium mb-2">Active Polls</div>
//             <div className="space-y-2">
//                 {polls.map((poll) => (  

//                     <div  key={poll._id} onClick={() => setSelectedPollId(poll._id) } className="block p-2 rounded-md hover:bg-muted transition-colors" >
//                         <div className="font-medium">{poll.question}</div>
//                         <div className="text-xs text-muted-foreground">{ poll.totalVotes ? poll.totalVotes :  0 } votes • { poll.createdAt ? timeAgo.format(new Date(poll.createdAt).getTime() - 60 * 1000 ) : 'dummy time ago '}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }


import React, { useState, useEffect } from 'react';
import { IPoll } from '@/types/poll';
import { usePolls } from '@/context/PollContext';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Button } from './ui/button'; // Assuming you've imported ShadCN UI components
import { Input } from './ui/input';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-EN');

interface PollListProps {
    initalPolls: IPoll[];
    setSelectedPollId: (id: string) => void;
}

export default function PollList({ initalPolls, setSelectedPollId }: PollListProps) {
    const { polls, addPoll } = usePolls();
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        initalPolls.forEach((poll) => addPoll(poll));
    }, [initalPolls, addPoll]);

    const filteredPolls = polls.filter((poll) =>
        poll.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Toggle button for mobile view only */}
            <div className="flex justify-center md:hidden mb-4">
                <Button onClick={() => setShowSidebar(!showSidebar)} variant="outline">
                    {showSidebar ? 'Close Polls' : 'Show Polls'}
                </Button>
            </div>

            {/* Slide-out sidebar for mobile */}
            <div
                className={`fixed top-0 right-0 h-full bg-background border-l shadow-lg p-4 transition-transform duration-300 md:hidden ${showSidebar ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ width: '300px' }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-medium">Active Polls</h2>
                    <Button onClick={() => setShowSidebar(false)} size="sm">
                        Close
                    </Button>
                </div>

                {/* Search bar */}
                <Input
                    type="text"
                    placeholder="Search polls..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                {/* Polls list */}
                <div className="space-y-2 overflow-auto h-[calc(100vh-140px)]">
                    {filteredPolls.map((poll) => (
                        <div
                            key={poll._id}
                            onClick={() => {
                                setSelectedPollId(poll._id);
                                setShowSidebar(false); // Optionally close the sidebar on selection
                            }}
                            className="block p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                        >
                            <div className="font-medium">{poll.question}</div>
                            <div className="text-xs text-muted-foreground">
                                {poll.totalVotes || 0} votes •{' '}
                                {poll.createdAt
                                    ? timeAgo.format(new Date(poll.createdAt).getTime() - 60 * 1000)
                                    : 'dummy time ago'}
                            </div>
                        </div>
                    ))}
                    {filteredPolls.length === 0 && (
                        <div className="text-xs text-muted-foreground">No polls found</div>
                    )}
                </div>
            </div>

            {/* Sidebar for desktop */}
            {/* Sidebar for desktop */}
            <div className="hidden md:block bg-background border-r w-full md:w-96 p-4 h-screen">
                <div className="text-sm font-medium mb-2">Active Polls</div>
                {/* Container for Poll List */}
                <div className="space-y-2 overflow-y-auto h-[calc(100vh-100px)]"> {/* Adjust the height if needed */}
                    {polls.map((poll) => (
                        <div
                            key={poll._id}
                            onClick={() => setSelectedPollId(poll._id)}
                            className="block p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                        >
                            <div className="font-medium">{poll.question}</div>
                            <div className="text-xs text-muted-foreground">
                                {poll.totalVotes || 0} votes •{' '}
                                {poll.createdAt
                                    ? timeAgo.format(new Date(poll.createdAt).getTime() - 60 * 1000)
                                    : 'dummy time ago'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

