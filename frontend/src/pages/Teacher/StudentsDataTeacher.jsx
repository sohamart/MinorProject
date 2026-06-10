import React from 'react'
import { Mail } from "lucide-react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MessageCircleMore } from "lucide-react";
import { Ban } from "lucide-react";
import Student from '../../assets/student.png'
import { BellRing } from "lucide-react";
import Notificationbox from '../../components/NotificationBox/Notificationbox'
import { useNotification } from '../../context/Notifications'




const StudentsDataTeacher = () => {
   const [students, setstudents] = useState([])
    const [error, seterror] = useState(null)
    const API = import.meta.env.VITE_API_URI
    const [loading, setloading] = useState(true)
    const [deletingId, setDeletingId] = useState(null);
    
const fetchStudents = async () => {
    

            try {
                const response = await axios.get(`${API}/api/auth/getAllStudent`,
                    { withCredentials: true }
                );

                setstudents(response.data.studentuserdata)
                seterror(null);
                
                
                

            } catch (error) {
                console.error('Error fetching :', error);
                setstudents([]);
                seterror(error.message);
                setloading(false);
            }
             finally {
        setloading(false); // 🔥 always stop loading
    }
        };

        

    useEffect(() => {
        
        fetchStudents();

    }, [])

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
        <div className='h-full relative w-full bg-black/10 flex flex-col items-center rounded-2xl  border border-white/50'>

            {/* Heading */}
            <div className='lg:w-120 relative h-18  w-50 lg:h-20 bg-white/10 border-r border-l border-b border-white/40  shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
                <h1 className='lg:text-3xl h-18 text-center flex justify-center items-center text-lg uppercase font-bold'>our students</h1>
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
            

            {/* Container */}
            <div className='overflow-y-scroll lg:pt-14 lg:pb-24 h-full pt-8 pb-30 no-scrollbar bg-black/20  lg:justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-xl [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] flex overflow-auto flex-wrap lg:gap-4 w-full mt-4 p-4 lg:p-8 justify-center  items-center lg:items-start'>

                {students.slice().reverse().map((student, index) => (
                    <div key={index} className='card mt-15 lg:mt-4 w-full max-w-[500px] lg:max-w-[530px]  p-4  rounded-2xl flex flex-col  items-center justify-between gap-4  backdrom-blur-md bg-white/10 shadow-lg hover:shadow-yellow-200/10 hover:scale-[1.02] transition-all duration-300 border border-white/50'>

                        {/* Image */}
                        <div className=' flex lg:flex-row flex-col w-full gap-4 justify-center items-center'>
                        <div className='border-2 bg-yellow-500/20  border-yellow-500 rounded-full  w-20 h-20 flex items-center justify-center overflow-hidden'>
                            <img
                                src={Student}
                                alt="avatar"
                                className="w-19  h-19 rounded-full object-cover object-center"
                            />
                        </div>

                        {/* Name + Subject */}
                        <div className='border  bg-green-400/10 border-green-400/30 w-full lg:w-70 rounded-2xl flex flex-col items-center justify-center p-2'>
                            <h1 className='text-sm lg:text-lg text-center'>
                                <span className='text-green-400'>Name: </span> {student.name}
                            </h1>
                            <p className='text-xs lg:text-base text-center'>
                                <span className='text-yellow-400'>Trade: </span> {student.trade}
                            </p>
                            <p className='text-xs lg:text-base text-center'>
                                <span className='text-blue-400'>Sem: </span> {student.sem}
                            </p>
                        </div>
                        </div>

                        {/* Email */}
                        <div className="flex  w-full  gap-4 justify-center items-center">
                                <div className='border  gap-4 bg-blue-500/10 border-blue-500/30 flex items-center justify-center p-2 w-full h-16 lg:h-21 rounded-2xl'>
                            <a
                                href={`mailto:${student.email}?subject=Student Query&body=hello ${student.name},`}
                                className="flex items-center justify-center w-12 h-12 lg:w-15 lg:h-15 rounded-2xl lg:rounded-full bg-white/10 border border-white/50 hover:scale-95 transition duration-300"
                            >
                                <Mail className="text-white" />
                            </a>

                            <a
                                className="flex  items-center justify-center w-12 h-12 lg:w-15 lg:h-15 rounded-2xl lg:rounded-full bg-white/10 border border-white/50 hover:scale-95 transition duration-300"

                                href={`https://wa.me/91${student.phone}?text=Hello%20${student.name}%2C%20I%20want%20to%20meet%20you%20tommorow`}>

                                <MessageCircleMore className="text-white" />
                            </a>

                            

                        </div>
                        
                        </div>
                        

                    </div>
                ))}

                {/* Error */}
                {error && (

                    <div className='absolute w-80 flex gap-2 flex-col items-center  justify-center top-3/6 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Ban className='w-10 h-10' />
                        <p className="text-red-500 mb-40 text-center text-2xl lg:text-4xl ">{error}</p>

                    </div>
                )}


                {/* Loading */}
                {loading && !deletingId && (
                    <p className="text-2xl lg:text-4xl absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        Loading...
                    </p>
                )}
                {students?.length === 0 && !loading && !error && (
                    <div className='absolute w-90 flex gap-2 flex-col items-center  justify-center top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Ban className='w-10 h-10' />


                        <p className="text-2xl text-center lg:text-4xl ">
                            No Students found !!.
                        </p>
                    </div>
                )}
            
            

            </div>
           

        </div>
    )
}

export default StudentsDataTeacher
