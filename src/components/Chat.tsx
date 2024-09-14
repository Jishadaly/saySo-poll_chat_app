import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { IMessage } from '@/types/message';
import axios from 'axios';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useChatContext } from '@/context/ChatContext';
import pusherJs from 'pusher-js';


export default function Chat({ pollId }: { pollId: string }) {

    // const [messages, setMessages] = useState<IMessage[] | null>([]);
    const { messages, setMessages } = useChatContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const messageEndref =  useRef<HTMLDivElement | null>(null);
    const id = pollId;
    const { isAuthenticated, getUser } = useKindeBrowserClient();
    const user = getUser();

    const scrollToBottom  = ()=>{
        if (messageEndref.current) {
            messageEndref.current.scrollIntoView({behavior:'auto'});
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/message/${pollId}`);
                console.log("11111111111111111", response);
                scrollToBottom()
                if (!response) {
                    throw new Error('Failed to fetch poll data');
                }
                setMessages(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMessages();
    
        const publickey = 'a11ad6345f89215d641d';
        const cluster = 'ap2';
        const pusher = new pusherJs(publickey, {
            cluster: cluster
        });
    
        const channel = pusher.subscribe('poll-channel');
    
        channel.bind('new-message', (data: any) => {
            console.log("Real-time data:", data);
            setMessages((prevMessages: any) => {
                return [...(prevMessages || []), data];
              })
        });
    
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [pollId]);
    


    return (
        <div className="space-y-4">
            {
                messages?.map((message) =>
                    <div className={`flex  gap-4 ${user?.email === message?.user?.email ? 'justify-end' : 'justify-start'}`}>

                        {
                            user?.email === message?.user?.email ? (
                                <>
                                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                                        {/* <div className="font-medium"> {message?.user?.username}</div> */}
                                        <div className="text-sm">{message.text}</div>
                                    </div>

                                    <Avatar className="w-8 h-8 border">
                                        <AvatarImage src={message?.user?.profile} alt="@shadcn" />
                                        <AvatarFallback>{message?.user?.username[0]}</AvatarFallback>
                                    </Avatar>
                                </>
                            ) : (
                                <>
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarImage src={message?.user?.profile} alt="@shadcn" />
                                        {/* <AvatarFallback>{message.user.username[0]}</AvatarFallback> */}
                                    </Avatar>

                                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                                        <div className="font-medium"> {message?.user?.username}</div>
                                        <div className="text-sm">{message.text}</div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                )}

                <div ref={messageEndref} />
        </div>
    )
}