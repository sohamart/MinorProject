import React from 'react'
import { useContext } from 'react';
import { AuthContextData } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import student from '../../assets/student.png'
import teacher from '../../assets/teacher.jpg'

import { Dot } from "lucide-react";

import { useState } from 'react';
import { toast } from 'react-toastify';
import Notificationbox from '../../components/NotificationBox/Notificationbox'
import { BellRing } from 'lucide-react';
import { useNotification } from '../../context/Notifications'

const TeacherProfile = () => {
    const { loggedinTeacher, setloggedinTeacher } = useContext(AuthContextData)
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_URI
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)

    const logouthandel = async () => {
        setloading(true)
        try {
            await axios.post(`${API}/api/auth/teacher/logout`,
                {},
                { withCredentials: true }
            )
            seterror(null)
            setloggedinTeacher(null)
            toast.success("logout succesfull")
            navigate('/login')


        }
        catch (error) {
            console.log(error);
            // seterror("server does not responce !!")
            toast.error("server does not responce !!")
            setloading(false)

        }
        finally {
            setTimeout(() => {
                setloading(false)
            }, 400);
            setTimeout(() => {
                seterror(null)
            }, 5000);




        }
    }

    const IsMedianApp =
        navigator.userAgent.includes("C.R");
    const isDesktop =
                  navigator.userAgent.includes("Electron");

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
        <div className=' relative border w-full h-full flex flex-col items-center lg:bg-black/5 bg-white/5 border-white/50 rounded-2xl'>
            <div className='lg:w-120 relative h-16 mb-15 w-50 lg:h-20 border-r border-l bg-white/10  border-b border-white/40  shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
                <h1 className='lg:text-3xl h-18 text-center flex justify-center items-center text-lg uppercase font-bold'>Profile</h1>
                <div onClick={boxopen} className = 'w-14 h-14 backdrop-blur-md z-2 absolute lg:top-20 top-16  flex justify-center items-center duration-300 active:scale-y-95 adsolute  bg-white/20  border-b-white/50 rounded-b-2xl border-b-2 '>
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

            
            {error && (
                <p className=' transition-all duration-300 ease-in text-red-500'>
                    {error}
                </p>

            )}

            <div className='mt-5 w-32 h-32  lg:w-50 lg:h-50 bg-green-400/10 border-2 border-green-400/30 rounded-full flex items-center justify-center overflow-hidden'>
                <img className=' w-30 h-30  lg:w-50 lg:h-50 rounded-full object-cover' src={teacher} alt="" />
            </div>
            <div className='flex flex-col items-center justify-center lg:flex-row lg:gap-12'>
                <div className='mt-5 w-min-50 p-2 pt-4 pb-5 lg:w-80 h:20 lg:mt-10 text-l flex-col lg:text-xl bg-orange-400/10 border border-orange-400/30 rounded-2xl flex items-center justify-center overflow-hidden'>
                    <h1><span className='text-orange-500'>Name : </span> {loggedinTeacher?.name}</h1>
                    <h1 ><span className='text-green-500 mt-5'>Subject  : </span>  {loggedinTeacher?.subject}</h1>

                </div>
                <div className='mt-5  pt-3 pb-6 pl-2 pr-2 lg: h:10 lg:mt-10 text-sm flex-col lg:text-2xl bg-white/10 border border-white/30 rounded-2xl flex items-center justify-center overflow-hidden'>
                    <h1><span className='text-orange-500'>Email : </span> {loggedinTeacher?.email}</h1>
                    <h1 className='flex justify-between items-center h-2  '><span className='text-green-500 mt-5'>Password  : </span> <span className='pt-4 pl-4'>...........</span> </h1>


                </div>
            </div>

            <button
                onClick={logouthandel}
                className='mt-5 lg:w-40 lg:h-14 w-30 active:scale-95 h-12 uppercase text-blue-400 hover:text-white hover:bg-blue-400 bg-blue-400/10 border border-blue-400/50 rounded-2xl flex items-center justify-center overflow-hidden'>
                {!loading ? ("logout") : ("loading...")}
            </button>
            {IsMedianApp || isDesktop ? (
                <div>
                    <h1 className='lg:text-xl md:text-3xl animate-pulse text-white lg:mt-8 mt-8 '>*No need to log in again for 10 days*</h1>
                </div>
            ) : (<div className='flex justify-center items-center'>
                <h1 className='lg:text-xl md:text-3xl text-center text-xs text-white lg:mt-8 mt-4 mb-2 '>*login Expiring in 24 hrs, Enjoy longer login sessions by downloading the app.* <a className=' animate-none underline text-blue-500' href='https://sohamart.github.io/C.R-Time-Pro/'>C.R Time Pro</a></h1>
            </div>)}


            
        </div>
    )
}

export default TeacherProfile
