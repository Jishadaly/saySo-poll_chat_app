import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { IMessage } from '@/types/message';
import axios from 'axios';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useChatContext } from '@/context/ChatContext';
import pusherJs from 'pusher-js';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';

export default function Chat({ pollId }: { pollId: string }) {

    const { messages, setMessages } = useChatContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const messageEndref = useRef<HTMLDivElement | null>(null);
    const [typing, setTyping] = useState<boolean | null>(null);
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [showGoToTop, setShowGoToTop] = useState<boolean>(false);
    const id = pollId;
    const { isAuthenticated, getUser } = useKindeBrowserClient();
    const user = getUser();

    const scrollToBottom = () => {
        if (messageEndref.current) {
            messageEndref.current.scrollIntoView({ behavior: 'auto' });
        }
    }
    const scrollToTop = () => {
        if (messageEndref.current) {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/message/${pollId}`);
                scrollToBottom();
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

        // const publickey = 'a11ad6345f89215d641d';
        const cluster = 'ap2';
        const publicKey = process.env.NEXT_PUBLIC_PUSHER_KEY!
        // const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string
        const pusher = new pusherJs(publicKey, {
            cluster: cluster
        });

        const channel = pusher.subscribe('poll-channel');

        channel.bind('new-message', (data: any) => {

            setMessages((prevMessages: any) => {
                return [...(prevMessages || []), data];
            })
        });

        channel.bind('user-typing', (data: any) => {

            if (data?.email !== user?.email) {

                setTyping(true);
                setTypingUser(data.name);
                setTyping(false);
            }
        })

        const handleScroll = () => {

            if (window.scrollY > 200) {
                setShowGoToTop(true)
            } else {
                setShowGoToTop(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            channel.unbind_all();
            channel.unsubscribe();

            window.removeEventListener('scroll', handleScroll)
        };
    }, [pollId, setMessages]);



    return (
        <div className="space-y-4 relative min-h-[500px]">

            {
                messages?.map((message) =>
                    <div className={`flex z-0  gap-4 ${user?.email === message?.user?.email ? 'justify-end' : 'justify-start'}`}>

                        {user?.email === message?.user?.email ? (
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
                                </Avatar>

                                <div className="bg-card rounded-md p-3 max-w-[80%]">
                                    <div className="font-medium"> {message?.user?.username}</div>
                                    <div className="text-sm">{message.text}</div>
                                </div>
                            </>
                        )}

                    </div>


                )}



            {showGoToTop && (
                <Button
                    onClick={scrollToTop}
                    className=" absolute bottom-4 sm:ml-6 right-4 rounded-full p-2 bg-neutral-800 text-white shadow-lg hover:bg-primary-dark transition-all z-50"
                    aria-label="Scroll to Top"
                >
                    <ArrowUp className="h-6 w-6" />
                </Button>
            )}



            {typing && (
                <div className="text-sm text-gray-500">
                    {typingUser} is typing...
                </div>)
            }

            <div ref={messageEndref} />
        </div>
    )
}