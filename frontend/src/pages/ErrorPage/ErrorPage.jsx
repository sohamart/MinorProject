import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

  const Navigate = useNavigate()
  const buttonclicked = () => {
    Navigate("/")
  }
  return (
    <div className='h-full rounded-2xl border border-white/30 w-full flex flex-col items-center justify-center text-white'>
        <div className='flex flex-col items-center justify-center w-screen h-screen    overflow-hidden text-white bg-black'>
            <h1 className='text-4xl lg:text-8xl md:text-6xl uppercase font-bold'>404 error !!</h1>
            <p className='mt-2 uppercase opacity-30'>poage not found</p>
            <button onClick={buttonclicked} className='pl-12 pr-12 h-14 rounded-2xl mt-8 text-2xl font-bold active:scale-95 duration-300 border border-red-400/50 bg-red-400/30'>Go to home</button>
        </div>

    </div>
  )
}

export default ErrorPage
