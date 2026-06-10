import React from 'react'
import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from 'react'
import Notificationbox from '../../components/NotificationBox/Notificationbox'
import { BellRing } from 'lucide-react';
import { useNotification } from '../../context/Notifications'



const HomeAdmin = () => {
  const { loggedinName } = useOutletContext()
  const navigate = useNavigate()
  const weeklybutton = ( ) =>{
    navigate("/admin/weeklyClass")
  }

  const studentbutton = ( ) =>{
    navigate("/admin/studentRegister")
  }
  const teacherbutton = ( ) =>{
    navigate("/admin/teacherRegister")
  }
  const Extrabutton = ( ) =>{
    navigate("/admin/ExtraClasses")
  }
  const todaybutton = ( ) =>{
    navigate("/admin/todayClasses")
  }
    const [showNotification, setShowNotification] = useState(false)
  
  const boxopen = () => {
        setShowNotification(!showNotification)
    }
    
    if(showNotification){
            return (           
                    <Notificationbox setShowNotification={setShowNotification} showNotification={showNotification}/>                      
            )}

  const { count } = useNotification();

  return (
    <div className= ' relative text-white h-full w-full lg:bg-black/5 bg-white/5 flex flex-col items-center    border border-white/50 rounded-xl  shadow-[0_8px_32px_rgba(0,0,0,0.5)] '>
      <div className='lg:w-120  h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center' >
            <h1 className='lg:text-3xl  uppercase font-bold'>Dashboard</h1>
            
        </div>
        <div
            onClick={boxopen}
            className='w-14 h-14 backdrop-blur-md z-2  flex justify-center items-center duration-300 active:scale-y-95 bg-white/20 border-b-white/50 rounded-b-2xl border-b-2'
          >
  <BellRing />

  {count > 0 && (
    <span
      className='
      absolute
      -top-2
      -right-2
      min-w-6
      h-6
      px-1
      bg-red-500/60
      text-white
      border border-red-500/50
      text-xs
      font-bold
      rounded-full
      flex
      items-center
      justify-center
      animate-pulse
      
      '
    >
      {count > 99 ? "99+" : count}
    </span>
  )}
</div>    
        <div className='h-full flex flex-col w-full justify-center items-center'>
          <h1 className='lg:text-8xl text-5xl text-center uppercase font-bold'>
            welcome back
          </h1>
          <p className='mt-3 lg:text-2xl text-2xl font-bold '>
        Admin - {loggedinName}
      </p>
      <p className='text-xl mt-5 mb-6 opacity-40'>Check Your Pages </p>
      <div className=' absolute  bottom-15 h-40   w-full overflow-auto no-scrollbar [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] items-center flex-wrap justify-center lg:mt-4 flex gap-5 p-5 '>
        <button onClick={weeklybutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-green-400/20 border border-green-400/50 rounded-2xl'>
          Weekly Class
        </button>
        <button  onClick={teacherbutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-blue-400/20 border border-blue-400/50 rounded-2xl'>
          Teacher Register
        </button>
        <button  onClick={studentbutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-red-400/20 border border-red-400/50 rounded-2xl'>
          Students Register
        </button>
        <button  onClick={Extrabutton} className='w-35 p-2 lg:w-45 lg:h-18 lg:text-xl text-xs h-12 active:scale-95 bg-yellow-400/20 border border-yellow-400/50 rounded-2xl'>
          Extra Class
        </button>

      </div>
      
      
      
        </div>
      
    </div>
  )
}

export default HomeAdmin