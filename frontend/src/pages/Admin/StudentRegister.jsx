import React from 'react'
import { CircleCheck } from "lucide-react";
import { Circle } from "lucide-react";
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContextData } from '../../context/AuthContext';

const StudentRegister = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const Navigate = useNavigate()
    const [userNotFound, setuserNotFound] = useState("")
    const { setloggedinAdmin, loggedinName, setloggedinName, API } = useContext(AuthContextData)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false) // 🔥 NEW

    const formhandel = async (e) => {
        e.preventDefault()
        setLoading(true) // 🔥 start

        try {
            const response = await axios.post(
                `${API}/api/auth/admin/login`,
                { email, password },
                { withCredentials: true }
            )

            setloggedinAdmin(response.data.adminuserdata)
            setloggedinName(response.data.adminuserdata.name)

            Navigate("/admin/")

        } catch (error) {
            console.log(error.response?.data?.message)
            setuserNotFound(error.response?.data?.message)
        } finally {
            setLoading(false) // 🔥 stop
        }

        setemail("")
        setpassword("")
    }

    return (
        <>
        <div className= ' relative text-white h-full w-full lg:bg-black/5 bg-white/5 flex flex-col items-center    border border-white/50 rounded-xl  shadow-[0_8px_32px_rgba(0,0,0,0.5)] '>
      <div className='lg:w-120  h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center' >
            <h1 className='lg:text-3xl  uppercase font-bold'>Student Register</h1>
            
        </div>

        <div className='mt-14 lg:mt-4'>
            <form
                            onSubmit={formhandel}
                            className={` backdrop-blur-2xl  border border-blue-400/50 bg-blue-400/15 relative lg:w-100 lg:p-5 w-80 md:w-180 p-5 md:p-15 rounded-2xl shadow-lg flex flex-col items-center justify-center`}>
            
                            <h1 className='absolute md:top-13 lg:top-6 top-5 text-2xl lg:text-2xl uppercase font-bold md:text-5xl'>Student Data</h1>
            
                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='Full Name'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10 mt-15 md:w-120 md:h-20 md:mt-20 lg:w-80 lg:h-13 lg:mt-18'
                                type="text"
                            />
                            <div className='pl-5 pr-5 gap-3 flex w-full'>
                                <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='Trade'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-1/2 h-10 mt-5 md:w-1/2 md:h-20 md:mt-10 lg:w-1/2 lg:h-13 lg:mt-5'
                                type="text"
                            />
                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='Sem'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-1/2 h-10 mt-5 md:w-1/2 md:h-20 md:mt-10 lg:w-1/2 lg:h-13 lg:mt-5'
                                type="text"
                            />
                            </div>
                            

                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='Email'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10  md:w-120 md:h-20 lg:mt-5 mt-5 md:mt-10 lg:w-80 lg:h-13 '
                                type="email"
                            />
                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='phone'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10  md:w-120 md:h-20 lg:mt-5 mt-5 md:mt-10 lg:w-80 lg:h-13 '
                                type="phone"
                            />
            
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder='Password'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10 mt-5 md:w-120 md:h-20 md:mt-10 lg:w-80 lg:h-13 lg:mt-5'
                            />
            
                            <div className='flex gap-1 items-center justify-end mt-2 w-full mr-12'>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <CircleCheck className='w-5 mt-1' /> : <Circle className='w-5 mt-1' />}
                                </button>
                                <h1 className='text-sm'>show password</h1>
                            </div>
            
                            <button
                                disabled={loading} // 🔥 disable while loading
                                className='active:scale-95 duration-300 bg-black text-white rounded-2xl w-25 h-11 mt-5 md:text-2xl md:w-60 md:h-20 md:mt-10 lg:w-33 lg:h-14 uppercase border border-amber-50 lg:mt-2'
                            >
                                {loading ? <h1 className='text-sm md:text-xl lg:text-xl'>loading...</h1> : "submit"} {/* 🔥 text change */}
                            </button>
            
                        </form>
        </div>
        <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                        <h1 className=' uppercase '>
                designed and devoloped by Soham Dutta
            </h1>
          </div>
        </div>
            
        </>
    
  )
}


export default StudentRegister
