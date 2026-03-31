import React from 'react'
import { useOutletContext } from "react-router-dom"

const HomeStudent = () => {
  const { loggedinName } = useOutletContext()

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl lg:text-8xl md:text-6xl uppercase font-bold'>Welcome Back</h1>
      <p className='mt-3 text-2xl'>
        Student - {loggedinName}
      </p>
    </div>
  )
}

export default HomeStudent