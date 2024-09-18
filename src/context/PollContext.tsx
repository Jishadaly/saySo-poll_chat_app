"use client";

import React, { createContext, useState, ReactNode, useContext, Children, useCallback } from "react";
import { IPoll } from "@/types/poll";

interface PollContextType {
    polls: IPoll[];
    addPoll: (newPoll: IPoll) => void;
    setSelectedPollId: (id: string) => void;
    selectedPollId: string | null;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const PollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [polls, setPolls] = useState<IPoll[]>([]);
    const [selectedPollId, setSelectedPollId] = useState<string | null>(null)

    const addPoll = useCallback((newPoll: IPoll) => {
        setPolls((prev) => {

            if (prev.some(poll => poll._id === newPoll._id)) {
                return prev; 
            }
            return [...prev, newPoll];
        });
    }, []);
    return (
        <PollContext.Provider value={{ polls, addPoll, selectedPollId, setSelectedPollId }}>
            {children}
        </PollContext.Provider>
    )
};

export const usePolls = () => {
    const context = useContext(PollContext)
    if (!context) {
        throw new Error('usePolls must be used within a PollProvider');
    }

    return context;
}