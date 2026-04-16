import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

  const navigate = useNavigate()
 
  const buttonclicked = () =>{
    console.log("clicked")
    navigate("/")
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-white bg-black'>
        <h1 className='text-4xl lg:text-8xl md:text-6xl uppercase font-bold'>404 error !!</h1>
        <p className='mt-2 uppercase opacity-30'>page not found</p>

        <button 
          onClick={buttonclicked} 
          className='px-12 z-12 h-14 rounded-2xl mt-8 text-2xl font-bold active:scale-95 duration-300 border border-red-400/50 bg-red-400/30'
        >
          Go to home
        </button>
    </div>
  )
}

export default ErrorPage