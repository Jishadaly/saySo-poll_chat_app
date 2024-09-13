import React, { useEffect, useState } from 'react'
import { PollDrower } from './PollDrower'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { IPoll } from '@/types/poll'
import Chat from './Chat'
import axios from 'axios'
import { toast } from 'sonner'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

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


  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/polls/${pollId}`);
        console.log(response);

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

  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();
    if(message === '') {
      return;
    }

    try {
      await axios.post('api/message',{
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

  if (loading) {
    return <div className="flex-1 flex justify-center items-center">
      <h2>Loading...</h2>
    </div>;
  }

  if (error) {
    return <div className="flex-1 flex justify-center items-center">
      <h2>Error : {error}</h2>
    </div>;
  }


  return (

    <div className="flex-1 flex flex-col">
      <PollDrower poll={poll as IPoll} />

      {/* <div className="flex-1 flex flex-col">
        <div className="bg-background border-b p-4 md:p-6">
          <div className="text-sm font-medium mb-2">Chat</div>
          <ScrollArea className="flex-1 overflow-auto">
            
          </ScrollArea>
        </div>
        <div className="bg-background p-4  md:p-6">
          <form className="flex items-center gap-2">
            <Input type="text" placeholder="Type your message..." className="flex-1" />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div> */}

      <div className="flex-1 flex flex-col h-full">
        <div className="bg-background border-b p-4 md:p-6 flex-1 overflow-auto">
          <div className="text-sm font-medium mb-2">Chat</div>
          <ScrollArea className="flex-1 overflow-auto">
              <Chat  pollId={pollId}/>
          </ScrollArea>
        </div>


        {/* Fixed bottom input section */}
        <div className="bg-background p-4 md:p-6 border-t sticky bottom-0 left-0 right-0">
          <form  onSubmit={handleSubmit} className="flex items-center gap-2 max-w-3xl mx-auto">
            <Input value={message ?? ''}  onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type your message..." className="flex-1" />
            <Button type='submit'  >Send</Button>
          </form>
        </div>
      </div>
      
    </div>
  )
}