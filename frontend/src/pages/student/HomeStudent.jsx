import React from 'react'
import { useOutletContext } from "react-router-dom"

const HomeStudent = () => {
  const { loggedinName } = useOutletContext()

  return (
    <div className= ' text-white h-full w-full backdrop-blur-2xl flex flex-col items-center bg-blend-darken rounded-2xl bg-black/15 border border-white/50'>
      <div className='lg:w-120 w-50 h-18 lg:h-20 bg-white/5 border border-white/20 rounded-2xl mt-2 flex items-center justify-center ' >
            <h1 className='lg:text-3xl uppercase font-bold'>Dashboard</h1>
            
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