import React from 'react'
import { House } from "lucide-react";

const dock = () => {
  return (
    <div className='h-full flex  items-center justify-around p-5 w-full'>
      <div className='w-[18vw] h-[7vh] flex justify-center items-center bg-white/10 rounded-full border border-amber-50/20 backdrop-blur-2xl shadow-2xl'>
        <House className='text-white w-5 h-5' />
      </div>
      <div className='w-[18vw] h-[7vh] flex justify-center items-center bg-white/10 rounded-full border border-amber-50/20 backdrop-blur-2xl shadow-2xl'>
        <House className='text-white w-5 h-5' />
      </div>
      <div className='w-[18vw] h-[7vh] flex justify-center items-center bg-white/10 rounded-full border border-amber-50/20 backdrop-blur-2xl shadow-2xl'>
        <House className='text-white w-5 h-5' />
      </div>
      
    </div>
  )
}

export default dock
