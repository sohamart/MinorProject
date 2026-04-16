import React from 'react'
import { ClockLoader } from 'react-spinners'



const loading = () => {
  const localdate = new Date()
  console.log(localdate)
  return (
    <div className='transform  transition ease-in duration-300 flex-col h-screen w-screen flex bg-black  items-center justify-center '>
      <h1 className='text-white absolute bottom-5 '>C.R TIME PRO</h1>
      <h1 className='text-white absolute bottom-5 '>C.R TIME PRO</h1>

      
      <ClockLoader
        color="#ffffff"
        loading
        size={80}
      />

      
      
    </div>
  )
}

export default loading
