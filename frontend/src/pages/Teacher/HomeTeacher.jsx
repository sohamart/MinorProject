import React from 'react'
import { useNavigate, useOutletContext } from "react-router-dom"


const HomeTeacher = () => {
  const { loggedinName } = useOutletContext()
  const navigate = useNavigate()
  const weeklybutton = ( ) =>{
    navigate("/teacher/weeklyClasses")
  }

  const todaybutton = ( ) =>{
    navigate("/teacher/todayClasses")
  }
  const studentbutton = ( ) =>{
    navigate("/teacher/studentsData")
  }
  const Extrabutton = ( ) =>{
    navigate("/teacher/ExtraClasses")
  }

  return (
    <div className=' relative text-white h-full w-full lg:bg-black/5 bg-black/5 flex flex-col items-center    border border-white/50 rounded-xl  shadow-[0_8px_32px_rgba(0,0,0,0.5)] '>
      <div className='lg:w-120  h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center' >
        <h1 className='lg:text-3xl  uppercase font-bold'>Dashboard</h1>

      </div>
      <div className='h-full flex  flex-col w-full justify-center items-center'>
        <h1 className='lg:text-8xl  text-5xl text-center uppercase font-bold'>
          welcome back
        </h1>
        <p className='mt-3 text-center lg:text-2xl text-xl font-bold '>
          Teacher - {loggedinName}
        </p>
        <p className='text-xl mt-5 opacity-40'>Check Your Pages </p>
      <div className=' absolute  bottom-15 h-40 w-full  overflow-auto no-scrollbar [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] items-center flex-wrap justify-center lg:mt-4 flex gap-5 p-5 '>
        <button onClick={weeklybutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-green-400/20 border border-green-400/50 rounded-2xl'>
          Weekly Class
        </button>
        <button  onClick={todaybutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-blue-400/20 border border-blue-400/50 rounded-2xl'>
          Today Class
        </button>
        <button  onClick={studentbutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-red-400/20 border border-red-400/50 rounded-2xl'>
          Students
        </button>
        <button  onClick={Extrabutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-yellow-400/20 border border-yellow-400/50 rounded-2xl'>
          Extra Class
        </button>

      </div>
        <div className='absolute bottom-[-12px] md:bottom-[-23px] lg:bottom-[-14px] text-[6px] md:text-[13px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                        <h1 className=' uppercase '>
                            designed and devoloped by Soham Dutta
                        </h1>
                    </div>


      </div>

    </div>
  )
}

export default HomeTeacher
