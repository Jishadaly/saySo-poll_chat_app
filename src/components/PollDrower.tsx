import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { CheckIcon } from "lucide-react"
import { IPoll } from "@/types/poll"
import { IOption } from "@/types/options"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

export function PollDrower({ poll }: { poll: IPoll }) {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<[] | null>(null);
    const { getUser } = useKindeBrowserClient();
    const user = getUser();
    const pollId = poll._id;
    const userEmail = user?.email;

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                setLoading(true);
                const response = await axios(`/api/options/${pollId}`);
                console.log(response);

                if (!response) {
                    throw new Error('Failed to fetch poll data');
                }
                const data = await response.data;
                setOptions(data);
                setLoading(false);

            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (pollId) {
            fetchPoll();
        }
    }, []);

    const handleVoteClick = async (optionId: string) => {
        try {
            const response = await axios.patch(`/api/options/${optionId}/${userEmail}`);
            console.log(response);
            const updatedOption = response.data;

            // Update the state with the new vote counts and percentages
            setOptions((prevOptions: any) => {
                if (!prevOptions) return prevOptions;

                return prevOptions.map((option: IOption) =>
                    option._id === updatedOption._id ? updatedOption : option
                );
            });

        } catch (error: any) {
            setError(error)
        }
    }

    if (loading) {
        return <div> Loading.... </div>
    }

    return (

        <Drawer >
            <DrawerTrigger asChild>
                <div className=" border-b">
                    <div className="flex items-center justify-between m-3">
                        <h2 className="text-2xl font-bold">{poll.question}</h2>
                        <Button variant="outline" className="ml-4 cursor-pointer">View Poll</Button>
                    </div>
                </div>

            </DrawerTrigger>
            <DrawerContent  >
                <div className="bg-background border-b p-6 md:p-8 ">
                    <h2 className="text-2xl font-bold mb-2">{poll.question}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        {options && options.map((option: IOption) => {

                            const hasVoted = option.votedUsers.some((userData:any)=> userData.email ===  user?.email ) 

                            return (

                                <div key={option._id} className="bg-card rounded-md p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-medium">{option.text}</div>
                                        <div className="text-sm font-medium">{option.percentage}%</div>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full">
                                        <div className="h-2 bg-primary rounded-full" style={{ width: `${option.percentage}%` }} />

                                    </div>

                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <Button variant="ghost" onClick={() => handleVoteClick(option._id)
                                            } size="icon" className="mt-2">
                                                <CheckIcon className="w-5 h-5" />
                                                <span className="sr-only">Select</span>
                                            </Button>
                                        </div>

                                        <div>
                                            <div className="text-sm font-medium">{option?.voteCount} votes {option.percentage}</div>

                                        </div>

                                    </div>
                                </div>
                            )

                        })}
                    </div>
                </div>


            </DrawerContent>
        </Drawer>
    )
}
