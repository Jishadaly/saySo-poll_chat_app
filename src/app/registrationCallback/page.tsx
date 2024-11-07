"use client";

import React, { useEffect } from 'react';
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Loading from '../Loading';

export  default  function Page() {
  const { getUser, isAuthenticated } = useKindeBrowserClient();
  const user =  getUser();
  const router = useRouter();

  useEffect(() => {
     
    if (isAuthenticated) {
      const user = getUser();
      
      const storeUser = async () => {
        try {
            const response = await axios.post('/api/user', {
            email: user?.email,
            name : user?.given_name,
            picture: user?.picture,
            
          });
          
          if (response.status === 201) {
            toast.success(response.data);
            router.push('/dashboard');
          }
          
          toast.success(response.data);
          router.push('/dashboard');
        } catch (error) {
          console.error('Failed to store user:', error);
        }
      };

      storeUser();
    }
  }, [isAuthenticated, getUser]);
 

  return (
    <div>
      {isAuthenticated ? (
        // 
        <Loading/>
      ) : (
        // <p>Registering user...</p>
        <Loading/>

      )}
    </div>
  )
}


 