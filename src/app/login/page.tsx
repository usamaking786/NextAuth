'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function signupPage() {
    const router = useRouter();
    const [user, setUser]=useState({
        email:"",
        password:""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [Loading, setLoading] = useState(false);

    const onLogin = async ()=> {
        try {
            setLoading(true);
            await axios.post("/api/users/login", user);
            router.push("/profile");
            setLoading(false);
           
            
    
        } catch (error:any) {
            console.log("login Failed", error);
            toast.error(error.message);
        }

    } 

   

    
    useEffect(() => {
      if(user.email.length>0 && user.password.length > 0 ){
          setButtonDisabled(false);
      } else {
        setButtonDisabled(true)
      }
    }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{Loading ? "Processing" : "login"}</h1>
        
        {/* Email */}
        <label htmlFor="email"> Email: </label>
        <input 
        type="text"
        className='p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value = {user.email}
        onChange = {(e) => setUser({...user, email: e.target.value})}
        />
        {/* Password */}
        <label htmlFor="password"> Password: </label>
        <input 
        type="text"
        className='p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value = {user.password}
        onChange = {(e) => setUser({...user, password: e.target.value})}
        />

        {/* Button */}
        <button onClick={onLogin}
        className = "p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >{buttonDisabled ? "No Login":"Login"}</button>
        
        <Link href={"/signup"}>Visit Sign Up Page</Link>

    </div>
  )
}
