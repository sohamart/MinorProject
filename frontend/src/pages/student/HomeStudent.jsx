import React from 'react'
import { useNavigate, useOutletContext } from "react-router-dom"

const HomeStudent = () => {
  const { loggedinName } = useOutletContext()
  const navigate =useNavigate()
  const weeklybutton = ( ) =>{
    navigate("/student/weeklyClasses")
  }

  const todaybutton = ( ) =>{
    navigate("/student/todayClasses")
  }
  const facultybutton = ( ) =>{
    navigate("/student/faculty")
  }

  return (
    <div className= ' relative text-white h-full w-full lg:bg-black/5 bg-black/5 flex flex-col items-center    border border-white/50 rounded-xl  shadow-[0_8px_32px_rgba(0,0,0,0.5)] '>
      <div className='lg:w-120  h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center' >
            <h1 className='lg:text-3xl  uppercase font-bold'>Dashboard</h1>
            
        </div>
        <div className='h-full flex flex-col w-full justify-center items-center'>
          <h1 className='lg:text-8xl text-5xl text-center uppercase font-bold'>
            welcome back
          </h1>
          <p className='mt-3 lg:text-2xl text-2xl font-bold '>
        Student - {loggedinName}
      </p>
      <p className='text-xl mt-5 opacity-40'>Check Your Pages </p>
      <div className=' h-20 w-full items-center justify-center lg:mt-4 flex gap-5 p-5 '>
        <button onClick={weeklybutton} className='w-25 lg:w-40 lg:h-15 lg:text-xl text-xs h-10 active:scale-95 bg-green-400/20 border border-green-400/50 rounded-2xl '>
          Weekly Class
        </button>
        <button  onClick={todaybutton} className='w-25 lg:w-40 lg:h-15 lg:text-xl text-xs h-10 active:scale-95 bg-blue-500/20 border border-blue-400/50 rounded-2xl '>
          Today Class
        </button>
        <button  onClick={facultybutton} className='w-25 lg:w-40 lg:h-15 lg:text-xl text-xs h-10 active:scale-95 bg-red-500/20 border border-red-400/50 rounded-2xl '>
          Faculties
        </button>

      </div>
      <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                        <h1 className=' uppercase '>
                designed and devoloped by Soham Dutta
            </h1>
          </div>
      
      
        </div>
      
    </div>
  )
}

export default HomeStudent