'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'
import axios from "axios";
import toast from 'react-hot-toast';

export default function profilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  // Get User Details
  const getUserDetails = async ()=> {
    try {
      const response = await axios.post("/api/users/me");
      console.log(response.data.data._id);
      setData(response.data.data._id);

    } catch (error:any) {
      console.log(error);
    }
  }

  // Logout Function
  const logout = async ()=> {
    try {
      await axios.post("api/users/logout")
      toast.success("logout Success")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message);

    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <h2>{data === "nothing" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
      onClick={getUserDetails}
      className="bg-blue-500 border border-gray-400 hover:bg-blue-dark text-black font-bold py-2 px-4 rounded">
        Get User Details
      </button>
      <hr />
      <button onClick={logout}
      className="bg-red-500 border border-gray-400 hover:bg-red-dark text-black font-bold py-2 px-4 rounded">Logout</button>

    </div>
  )
}

