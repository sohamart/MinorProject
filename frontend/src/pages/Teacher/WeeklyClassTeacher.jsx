import React from 'react'
import { useContext } from 'react'
import { ClassContextData } from '../../context/ClassContext'
import { motion } from 'framer-motion'


const WeeklyClassTeacher = () => {
    const { WeeklyClass, error, loading } = useContext(ClassContextData)

    return (
        <>
            <div className=' relative text-white h-full w-full lg:bg-black/5 bg-black/20 flex flex-col items-center    border border-white/50 rounded-xl  shadow-[0_8px_32px_rgba(0,0,0,0.5)] '>
                <div className='lg:w-120   h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center' >
                    <h1 className='lg:text-3xl  flex h-18  items-center justify-center  uppercase font-bold'>weekly Class</h1>

                </div>
                
                <div className='  flex gap-12 pt-24 pb-24 lg:w-full  flex-col overflow-auto no-scrollbar [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] w-full  items-center'>
                    {/* 🔥 ERROR */}
                    {WeeklyClass.length === 0 &&(
                        <motion.p
                        animate={{
                            opacity: 40
                            
                        }}
                        transition={{
                            duration: 0.8,
                            ease : "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                            
                        }}

                        className=" lg:text-4xl opacity-30  text-xl">No Classes Found !!</motion.p>
                    )}


                    {!loading && WeeklyClass.length > 0 && WeeklyClass.map((dayData, i) => (    
                        <div key={i} className=''>
                            <div className='card bg-blue-400/10 border lg:w-180 flex p-2 border-blue-500/50 min-h-50 gap-4 flex-col items-center w-80 rounded-2xl '>
                               <div >
                                    <h1 className='text-2xl text-white font-bold uppercase mt-2'>{dayData.day}</h1>
                               </div>
                               {dayData.classes.map((cls, index) => (
                                    <div key={index} className='w-full  uppercase lg:text-2xl p-4  bg-black/30 rounded-2xl border border-white/50'> 
                                        <h1 className='w-full h-12 bg-blue-600/10 border items-center rounded-2xl border-blue-500/50 flex justify-around '><span className='font-bold text-blue-400'>Class    </span> <span>:</span> {cls.subject}</h1>
                                        
                                        <div className='w-full mt-4 lg:p-22 uppercase p-2 h-34 lg:h-50 gap-4 justify-center bg-white/5 border border-white/50 rounded-2xl flex flex-col '>
                                        <h1 className='w-full flex justify-around bg-green-400/20 border border-green-300/50 rounded-2xl items-center lg:h-28 h-8'><span className='font-bold text-green-400'>Sir    </span> <span>:</span> {cls.teacher}</h1>
                                        <h1 className='w-full flex justify-around bg-red-400/20 border border-red-300/50 rounded-2xl items-center lg:h-28 h-8'><span className='font-bold text-red-400'>Time      </span> <span>:</span> {cls.time}</h1>
                                        <h1 className='w-full flex justify-around bg-yellow-400/20 border border-yellow-300/50 rounded-2xl items-center lg:h-28 h-8'><span className='font-bold text-yellow-400'>Type    </span> <span>:</span> {cls.type}</h1>
                                        </div>
                                    </div>
                                    
                                    ))}

                                


                            </div>
                        </div>
                    ))}



                    <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                        <h1 className=' uppercase '>
                            designed and devoloped by Soham Dutta
                        </h1>
                    </div>


                </div>

            </div>
        </>
    )
}

export default WeeklyClassTeacher
