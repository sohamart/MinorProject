import React from 'react'
import { House } from "lucide-react";
import { UserRound } from "lucide-react";
import { PcCase } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContextData } from '../../context/AuthContext';






const TeacherDock = () => {
    const navigate = useNavigate()
    const { loggedinStudent } = useContext(AuthContextData)
    const homeHandel = () => {
        
        navigate("/")
  }
  const ProfileHandel = () => {
    
    navigate(`/student/profile/${loggedinStudent?._id}`)
}
  return (
    <div className='h-full flex  items-center justify-around p-5 w-full'>
      <button onClick={homeHandel}  className='w-[18vw] h-[7vh] flex justify-center items-center bg-white/10 rounded-full border border-amber-50/20 backdrop-blur-2xl shadow-2xl'>
        <House className='text-white w-5 h-5' />

      </button>
      <div className='w-[18vw] h-[7vh] flex justify-center items-center bg-white/10 rounded-full border border-amber-50/20 backdrop-blur-2xl shadow-2xl'>
        
        <PcCase className='text-white w-5 h-5' />
      </div>
      <div onClick={ProfileHandel} className='w-[18vw] h-[7vh] flex justify-center items-center bg-white/10 rounded-full border border-amber-50/20 backdrop-blur-2xl shadow-2xl'>
        
        <UserRound className='text-white w-5 h-5' />
      </div>
      
    </div>
  )
}

export default TeacherDock
