import React from 'react'
import { useOutletContext } from "react-router-dom"

const HomeStudent = () => {
  const { loggedinName } = useOutletContext()

  return (
    <div className= ' text-white h-full w-full  flex flex-col items-center    border border-white/40 rounded-xl  shadow-[0_8px_32px_rgba(0,0,0,0.5)] '>
      <div className='lg:w-120 h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40  shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center' >
            <h1 className='lg:text-3xl  uppercase font-bold'>Dashboard</h1>
            
        </div>
        <div className='h-full flex flex-col w-full justify-center items-center'>
          <h1 className='lg:text-8xl text-5xl text-center uppercase font-bold'>
            welcome back
          </h1>
          <p className='mt-3 lg:text-2xl text-2xl font-bold '>
        Student - {loggedinName}
      </p>
        </div>
      
    </div>
  )
}

export default HomeStudent