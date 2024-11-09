import React, { useEffect, useState } from 'react'
import { PollDrower } from './PollDrower'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { IPoll } from '@/types/poll'
import Chat from './Chat'
import axios from 'axios'
import { toast } from 'sonner'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import debounce from 'lodash.debounce'
import { Loader2 } from "lucide-react"
import { SendIcon } from './ui/sendIcon'
import EmojiPicker from 'emoji-picker-react';
import { EmojiIcon } from './ui/EmojyIcon'


interface DiscussionProps {
  pollId: string;
}

export default function Discussion({ pollId }: DiscussionProps) {
  const [poll, setPoll] = useState<IPoll | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>('');
  const { getUser, isAuthenticated } = useKindeBrowserClient();
  const user = getUser();
  const email = user?.email;
  const [showEmojiPicker , setShowEmojiPicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/polls/${pollId}`);

        if (!response) {
          throw new Error('Failed to fetch poll data');
        }
        const data = await response.json();
        setPoll(data);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (pollId) {
      fetchPoll();
    }
  }, [pollId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message === '') {
      return;
    }
    try {
      await axios.post('api/message', {
        message,
        email,
        pollId

      });
      setMessage('');
      toast.success('message was sended');

    } catch (error) {
      console.log(error);
    }
  }

  const handleEmojiClick = (event:any, emojiObject:any) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleTyping = debounce(() => {
    if (user?.email) {
      axios.post('/api/typing', {
        pollId,
        email: user?.email,
        name: user?.username
      });
    }

  }, 300);

  if (loading) {
    return <div className="flex-1 flex justify-center items-center"> <Loader2 className="md:h-12 md:w-12 animate-spin" />  </div>;
  }

  if (error) {
    return <div className="flex-1 flex justify-center items-center">
      <h2>Error : {error}</h2>
    </div>;
  }


  return (

    <div className="flex-1 flex flex-col">
      <PollDrower poll={poll as IPoll} />

      <div className="flex-1 flex flex-col h-full">
        <div className="bg-background border-b-0 p-4 md:p-6 flex-1 overflow-auto">
          <div className="text-sm font-medium mb-2">Chat</div>
          <ScrollArea className="flex-1 overflow-auto">
            <Chat pollId={pollId} />
          </ScrollArea>
        </div>

        {showEmojiPicker && (
                <div className="fixed md:mt-72 mb-2 ml-5 md:10">
                    <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmojiClick} />
                </div>
            )}

        {/* Fixed bottom input section */}
        <div className="bg-background p-4 md:p-6 border-t rounded-3xl sticky bottom-0 left-0 right-0">

          <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-3xl mx-auto">

            {/* Emoji Icon Button */}
            <button type="button" className="p-2 rounded-full hover:bg-gray-200 transition">
              <EmojiIcon onClick={toggleEmojiPicker} className="w-6 h-6 text-gray-500" />
            </button>

            <Input value={message ?? ''} onChange={(e) => { setMessage(e.target.value); handleTyping() }} type="text" placeholder="Type your message..." className="flex-1" />
            <Button type='submit'  >
              <SendIcon className="w-5 h-5 " />
            </Button>
          </form>
        </div>
      </div>

    </div>
  )
}