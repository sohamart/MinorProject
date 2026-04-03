import React from 'react'
import { useContext } from 'react';
import { AuthContextData } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useState } from 'react';





const Profile = () => {
    const { loggedinStudent, setloggedinStudent } = useContext(AuthContextData)
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_URI
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)

    const logouthandel = async () => {
        try{
            await  axios.post(`${API}/api/auth/student/logout`,
            {},    
            { withCredentials: true }
        )
            setloading(true)
            setloggedinStudent(null)
            navigate('/login')
            
        }
        catch(error){
            console.log(error);
            seterror(true)
            setloading(false)
            
        }
        finally{
            
            setloading(false)
            seterror(false)
        }  
    }
    
  return (
    <div className=' border w-full h-full flex flex-col items-center lg:bg-black/5 bg-white/5 border-white/50 rounded-2xl'>
        <div className='lg:w-120 h-16 mb-8 w-50 lg:h-20 border-r border-l bg-white/10  border-b border-white/40  shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
                <h1 className='lg:text-3xl h-18 text-center flex justify-center items-center text-lg uppercase font-bold'>Profile</h1>
            </div>
        <div className='mt-5 w-30 h-30 lg:w-50 lg:h-50 bg-green-400/10 border border-green-400/30 rounded-full flex items-center justify-center overflow-hidden'>

        </div>
        <div className='flex flex-col items-center justify-center lg:flex-row lg:gap-12'>
                <div className='mt-5 w-50 pt-4 pb-5 lg:w-80 h:20 lg:mt-10 text-l flex-col lg:text-2xl bg-orange-400/10 border border-orange-400/30 rounded-2xl flex items-center justify-center overflow-hidden'>
                <h1><span className='text-orange-500'>Name : </span> {loggedinStudent?.name}</h1>
                <h1><span className='text-green-500 mt-5'>Trade  : </span>  {loggedinStudent?.trade}</h1>
                
        </div>
        <div className='mt-5 w-60 pt-3 pb-4 lg:w-80 h:10 lg:mt-10 text-sm flex-col lg:text-2xl bg-white/10 border border-white/30 rounded-2xl flex items-center justify-center overflow-hidden'>
                <h1><span className='text-orange-500'>Email : </span> {loggedinStudent?.email}</h1>
                <h1><span className='text-green-500 mt-5'>Password  : </span>  not revealed </h1>
                
                
        </div>
        </div>
        
        <button 
        onClick={logouthandel}
        className='mt-5 lg:w-40 lg:h-14 w-30 active:scale-95 h-12 uppercase text-blue-400 hover:text-white hover:bg-blue-400 bg-blue-400/10 border border-blue-400/50 rounded-2xl flex items-center justify-center overflow-hidden'>
            logout
        </button>

    </div>
  )
}

export default Profile
