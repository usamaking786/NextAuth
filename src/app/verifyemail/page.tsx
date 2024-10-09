'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Link from 'next/link';

export default function verifyEmailPage() {
    const [token, setToken]=useState("");
    const [verified, setVerified] = useState(false);
    const [Error, setError] = useState(false);
    
    const verifyEmail = async () => {
        try {
            setError(false);
            const tokendone = await axios.post("/api/users/verifyemail", {token});
            console.log(tokendone)
            setVerified(true);

        } catch (error:any) {
            setError(true);
            console.log(error)            
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken)
        // you can also do this work by the Router and next Js query work
    }, []);

    // if token.length > 0 
    useEffect(() => {
      if(token.length >  0)
      {
        verifyEmail();
      }
    }, [token])
    


    return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h2 className='text-4xl'>Verify Email</h2>
<h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}` : "No Token"}</h2>  
    {verified && (
        <div className='text-center'>
    <h2 className='text-4xl'>Email Verified</h2>
    <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href={"/login"}>Login</Link>
    </div>
    )}

    {
        Error && (
            <div>
                <h2 className='text-4xl'>Error</h2>
            </div>
        )
    }

    </div>
  )
}

