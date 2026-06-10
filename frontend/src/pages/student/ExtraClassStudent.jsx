import React from 'react'
import { useContext } from 'react'
import { ClassContextData } from '../../context/ClassContext'
import { useState } from 'react'
import Notificationbox from '../../components/NotificationBox/Notificationbox'
import { BellRing } from 'lucide-react';
import { useNotification } from '../../context/Notifications'

const ExtraClassStudent = () => {
    const { TodayClass: TodayData, error, loading } = useContext(ClassContextData)
    const extraClasses = TodayData?.classes?.filter(
        cls => cls.remarks && cls.remarks.length > 2
    );
    const currentLocal = new Date()
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
        <>
            <div className=' relative text-white h-full w-full lg:bg-black/5 bg-black/20 flex flex-col items-center    border border-white/50 rounded-xl  shadow-[0_8px_32px_rgba(0,0,0,0.5)] '>
                <div className='lg:w-120 relative  h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center' >
                    <h1 className='lg:text-3xl  flex h-18  items-center justify-center  uppercase font-bold'>Extra Class</h1>
                     <div onClick={boxopen} className = 'w-14 h-14 backdrop-blur-md z-2 absolute top-18  flex justify-center items-center duration-300 active:scale-y-95 adsolute  bg-white/20  border-b-white/50 rounded-b-2xl border-b-2 '>
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
                </div>
                {/* day */}
                <div className='absolute top-30  lg:left-12 left-2 ' >
                    <h1 className='text-xl  lg:text-2xl text-white font-bold uppercase mt-2'>{TodayData?.day || "Holi Day"}</h1>
                </div>

                {/*date  */}
                <div className='absolute top-30 lg:right-12 right-2' >
                    <h1 className='text-xl lg:text-2xl text-white font-bold uppercase mt-2'>{currentLocal.toLocaleDateString()}</h1>
                </div>


                <div className='  flex h-full  gap-12 pt-10 mt-22 pb-24 lg:w-full  flex-col overflow-auto no-scrollbar [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] w-full  items-center'>
                    {/* 🔥 ERROR */}
                    {TodayData === null && (
                        <p className="text-white animate-pulse text-xl">No classes Found !! </p>
                    )}

                    {!loading && TodayData && (
                        <div className=' lg:pl-52 lg:pr-52 flex-col lg:flex-row gap-4 flex-wrap flex justify-center items-center'>

                            {TodayData?.classes?.length === 0 && (
                                <p className="text-red-500 animate-pulse text-xl">No classes Found !!</p>
                            )}



                            {extraClasses?.length > 0 ? (
                                extraClasses.slice().reverse().map((cls, index) => (
                                    <div key={index} className=' w-80 relative   uppercase lg:text-2xl p-4  bg-black/30 rounded-2xl border border-white/50'>
                                        {cls.remarks?.length > 2 && (<div className='flex mt-[-16px] mb-4'>
                                            <span className=' bg-blue-600 border-b active:scale-95 rounded-b-2xl  p-2'>{cls.remarks}</span>
                                        </div>)}
                                        <h1 className='w-full h-12 bg-blue-600/10 border text-xl items-center rounded-2xl border-blue-500/50 flex justify-around '>{cls.subject}</h1>

                                        <div className='w-full mt-4 lg:p-4 uppercase p-2 min-h-10 lg:min-h-50 gap-4 justify-center bg-white/5 border border-white/50 rounded-2xl flex flex-col '>
                                            <h1 className='w-full flex justify-around bg-green-400/20 border border-green-300/50 rounded-2xl items-center lg:min-h-10 min-h-8'>{cls.teacher}</h1>
                                            <h1 className='w-full flex justify-around bg-red-400/20 border border-red-300/50 rounded-2xl lg:text-xl text-xs items-center lg:min-h-10 min-h-8'>{cls.time}</h1>
                                            <h1 className='w-full flex justify-around bg-yellow-400/20 border border-yellow-300/50 rounded-2xl items-center lg:min-h-10 min-h-8'>{cls.type}</h1>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No Extra Classes Found</h1>
                            )}





                        </div>

                    )}





                </div>
                <div className='absolute bottom-[-12px] md:bottom-[-23px] lg:bottom-[-14px] text-[6px] md:text-[13px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                    <h1 className=' uppercase '>
                        designed and devoloped by Soham Dutta
                    </h1>
                </div>
            </div>
        </>
    )
}

export default ExtraClassStudent
