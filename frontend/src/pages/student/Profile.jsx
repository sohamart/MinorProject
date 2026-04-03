import React from 'react'
import { useContext } from 'react';
import { AuthContextData } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import student from '../../assets/student.png'
import { Dot } from "lucide-react";

import { useState } from 'react';







const Profile = () => {
    const { loggedinStudent, setloggedinStudent } = useContext(AuthContextData)
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_URI
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)

    const logouthandel = async () => {
        setloading(true)
        try{
            await  axios.post(`${API}/api/auth/student/logout`,
            {},    
            { withCredentials: true }
        )
            seterror(null)
            setloggedinStudent(null)
            navigate('/login')
            
            
        }
        catch(error){
            console.log(error);
            seterror("server does not responce !!")
            setloading(false)
            
        }
        finally{
            setTimeout(() => {
                setloading(false)
            }, 400);
            setTimeout(() => {
                seterror(null)
            }, 5000);
            
            

            
        }  
    }
    
  return (
    <div className=' relative border w-full h-full flex flex-col items-center lg:bg-black/5 bg-white/5 border-white/50 rounded-2xl'>
        <div className='lg:w-120 h-16 mb-8 w-50 lg:h-20 border-r border-l bg-white/10  border-b border-white/40  shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
                <h1 className='lg:text-3xl h-18 text-center flex justify-center items-center text-lg uppercase font-bold'>Profile</h1>
            </div>
        {error && (
            <p className=' transition-all duration-300 ease-in text-red-500'>
                {error}
            </p>
            
        )}
        
        <div className='mt-5 w-30 h-30 lg:w-50 lg:h-50 bg-green-400/10 border-2 border-green-400/30 rounded-full flex items-center justify-center overflow-hidden'>
                <img className=' w-30 h-30 lg:w-50 lg:h-50 rounded-full mt-7' src={student} alt="" />
        </div>
        <div className='flex flex-col items-center justify-center lg:flex-row lg:gap-12'>
                <div className='mt-5 w-50 pt-4 pb-5 lg:w-80 h:20 lg:mt-10 text-l flex-col lg:text-2xl bg-orange-400/10 border border-orange-400/30 rounded-2xl flex items-center justify-center overflow-hidden'>
                <h1><span className='text-orange-500'>Name : </span> {loggedinStudent?.name}</h1>
                <h1><span className='text-green-500 mt-5'>Trade  : </span>  {loggedinStudent?.trade}</h1>
                
        </div>
        <div className='mt-5  pt-3 pb-6 pl-2 pr-2 lg: h:10 lg:mt-10 text-sm flex-col lg:text-2xl bg-white/10 border border-white/30 rounded-2xl flex items-center justify-center overflow-hidden'>
                <h1><span className='text-orange-500'>Email : </span> {loggedinStudent?.email}</h1>
                <h1 className='flex justify-between items-center h-2  '><span className='text-green-500 mt-5'>Password  : </span> <span className='pt-4 pl-4'>...........</span> </h1>
                
                
        </div>
        </div>
        
        <button 
        onClick={logouthandel}
        className='mt-5 lg:w-40 lg:h-14 w-30 active:scale-95 h-12 uppercase text-blue-400 hover:text-white hover:bg-blue-400 bg-blue-400/10 border border-blue-400/50 rounded-2xl flex items-center justify-center overflow-hidden'>
            {!loading ? ("logout"):("loading...")}
        </button>
        
        <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                                <h1 className=' uppercase '>
                                    designed and devoloped by Soham Dutta
                                </h1>
                            </div>
    </div>
  )
}

export default Profile
