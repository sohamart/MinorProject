import React, { useContext, useEffect } from 'react'
import { ClassContextData } from '../../context/ClassContext'
import { Ban } from "lucide-react";

const WeeklyClass = () => {

  

  const { getWeeklyClasses, error, loading, weekly} = useContext(ClassContextData);

  useEffect(() => {
    getWeeklyClasses(); // first load

    const interval = setInterval(() => {
      getWeeklyClasses(); // 🔥 only weekly page refresh
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative text-white h-full w-full lg:bg-black/5 bg-white/5 flex flex-col items-center border border-white/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'>
      
      {/* HEADER */}
      <div className='lg:w-120 h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
        <h1 className='lg:text-3xl uppercase font-bold'>Weekly Classes</h1>
      </div>

      {/* BODY */}
      <div className='shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md h-full pt-10 w-full overflow-auto pb-20 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]'>
          
        <div className='overflow-y-auto p-4 flex flex-col items-center gap-6'>

         
          {/* 🔥 ERROR */}
          {error && (
            <p className="text-red-500 text-xl">{error}</p>
          )}

          {/* 🔥 WEEKLY DATA */}
          {!loading && weekly.length > 0 && weekly.map((dayData, i) => (
            <div key={i} className='w-full lg:w-[90%] bg-white/10 border border-white/20 rounded-xl p-4'>

              {/* DAY TITLE */}
              <h2 className='text-xl lg:text-2xl font-bold mb-3 uppercase text-yellow-400'>
                {dayData.day}
              </h2>

              {/* CLASSES */}
              <div className='flex flex-col gap-3'>
                {dayData.classes.map((cls, index) => (
                  <div 
                    key={index}
                    className='w-full lg:h-24 bg-white/10 border border-white/20 rounded-lg p-3 flex justify-between items-center'
                  >
                    <div>
                      <h2 className='font-bold'>{cls.subject}</h2>
                      <p className='text-sm mt-1 text-gray-300'>{cls.teacher}</p>
                      <p className='text-xs mt-1 text-green-500'>{cls.time}</p>
                    </div>

                    <span className={`px-3 py-1 h-8 flex items-center uppercase rounded-full text-xs font-semibold 
                      ${cls.type?.toLowerCase() === "lab"
                        ? "bg-green-500/20 border border-green-500/50"
                        : "bg-blue-500/20 border border-blue-500/50"}`}>
                      {cls.type}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}

          {/* 🔥 EMPTY */}
          {!loading && weekly.length === 0 && !error && (
            <div className='absolute w-90 flex gap-2 flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Ban className='w-10 h-10' />
              <p className="text-2xl text-center lg:text-4xl">
                No weekly data found !!
              </p>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
        <h1 className='uppercase'>
          designed and developed by Soham Dutta
        </h1>
      </div>

    </div>
  )
}

export default WeeklyClass