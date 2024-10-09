'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function signupPage() {
    const router = useRouter();
    const [user, setUser]=useState({
        username:"",
        email:"",
        password:""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [Loading, setLoading] = useState(false);

    const onSignup = async ()=> {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup Success", response.data);
            router.push("/login");
            setLoading(false);
    
        } catch (error:any) {
            console.log("signup Failed", error);
            toast.error(error.message);
        }

    } 

   

    
    useEffect(() => {
      if(user.email.length>0 && user.password.length > 0 && user.username.length > 0){
          setButtonDisabled(false);
      } else {
        setButtonDisabled(true)
      }
    }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{Loading ? "Processing" : "Signup"}</h1>
        {/* username */}
        <label htmlFor="username"> Username: </label>
        <input 
        type="text"
        className='p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value = {user.username}
        onChange = {(e) => setUser({...user, username: e.target.value})}
        />
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
        <button onClick={onSignup}
        className = "p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >{buttonDisabled ? "No Signup":"Signup"}</button>
        
        <Link href={"/login"}>Visit Login Page</Link>

    </div>
  )
}


