import React from 'react'
import { ClockLoader } from 'react-spinners'



const loading = () => {
  const localdate = new Date()
  console.log(localdate)
  return (
    <div className='transform  transition ease-in duration-300 flex-col h-screen w-screen flex bg-black  items-center justify-center '>
      <h1 className='text-white text-xl lg:text-4xl md:text-4xl font-bold absolute top-2 '>C.R TIME PRO</h1>
      

      
      <ClockLoader
        color="#ffffff"
        loading
        size={80}
      />

      
      
    </div>
  )
}

export default loading
