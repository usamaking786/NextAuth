import React from 'react'
// in 
export default function page({params} : any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1>Profile Page</h1>
        {/* Which name we give to the folder. Same name we give here */}
        <h2 className='bg-green-400 text-black rounded p-3'>{params.id}</h2>
    </div>
  )
}

