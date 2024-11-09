"use client"

import React, { useState } from 'react'
import PollList from './PollList';
import { IPoll } from '@/types/poll';
import Discussion from './Discussion';


export default function Main({ polls }: { polls: IPoll[] }) {
     const [selectedPollId, setSelectedPollId] = useState<string | null>(null);
     
    return (
        <>
            <PollList initalPolls={polls || []} setSelectedPollId={(id: string) => setSelectedPollId(id)} />
            {selectedPollId ? (
                <Discussion pollId={selectedPollId} />
            ) : (
                <div className="flex-1 flex justify-center items-center">
                    <h2>Select a poll to see the discussion</h2>
                </div>
            )}
        </>
    )
}