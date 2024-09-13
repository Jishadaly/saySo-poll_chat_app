"use client";

import React, { useEffect } from 'react';
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export  default  function Page() {
  const { getUser, isAuthenticated } = useKindeBrowserClient();
  const user =  getUser();
  const router = useRouter();

  useEffect(() => {
    // When the user is authenticated, make an API call to store user data
    if (isAuthenticated) {
      const user = getUser();
      console.log(user);
      
      const storeUser = async () => {
        try {
          // Call your backend API to store the user information
          const response = await axios.post('/api/user', {
            email: user?.email,
            name : user?.given_name,
            picture: user?.picture,
            // Add any other required user details here
          });
          console.log('User stored successfully',response);
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
        <p>Redirecting to the dashboard...</p>
      ) : (
        <p>Registering user...</p>
      )}
    </div>
  )
}


 