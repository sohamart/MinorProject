
import React from 'react'
import { CircleCheck } from "lucide-react";
import { Circle } from "lucide-react";
import { useState, useContext } from 'react';
import axios from 'axios';
import teacher from '../../assets/teacher.jpg'
import { useNavigate } from 'react-router';


const TeacherRegister = () => {
  const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [subject, setsubject] = useState("")
   
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const API = import.meta.env.VITE_API_URI
    const [RegisterdSuccess, setRegisterdSuccess] = useState(false)
    const [registeredData, setregisteredData] = useState(null)
    const [error, seterror] = useState(null)


    const formhandel = async (e) => {
        e.preventDefault()
        setLoading(true) // 🔥 start

        try {
            const response = await axios.post(
                `${API}/api/auth/teacher/register`,
                { name, email, password, phone, subject },
                { withCredentials: true }
            )
            console.log(response.data)

            setregisteredData(response.data.teacheruserdata)
            console.log(registeredData)

            



        } catch (error) {
            console.log(error.response?.data?.message)
            seterror(error.response?.data?.message)
        } finally {
            setLoading(false) //
            setRegisterdSuccess(true) 
            setTimeout(() => {
                setRegisterdSuccess(false)
            }, 11000);


        }

        setemail("")
        setpassword("")
        setname("")
        setphone("")
        setsubject("")
        setShowPassword(false)
    }
    const okbuttonhandel = () => {
        setRegisterdSuccess(false)
    }
    const checkbuttonhandel = () => {
        setRegisterdSuccess(false)
        navigate("/admin/facultiesData")
    }
    const ErrorOK = () => {
        setRegisterdSuccess(false)
        seterror(null)
    }

    return (
        <>
            <div className='h-full relative w-full bg-black/20 flex flex-col items-center rounded-2xl pl-1 border border-white/50'>

                {/* Heading */}
                <div className='lg:w-120 h-18 mb-2 w-50 lg:h-20 bg-white/10 border-r  border-l border-b border-white/40   rounded-2xl mt-2 flex items-center justify-center'>
                    <h1 className='lg:text-3xl h-18 text-center flex justify-center items-center text-lg uppercase font-bold'>Teacher Register</h1>
                </div>

                {/* Container */}
                <div className='overflow-y-scroll no-scrollbar h-full pt-8 pb-30       backdrop-blur-md rounded-xl  flex overflow-auto flex-wrap lg:gap-4 w-full mt-4 p-4 lg:p-8 justify-center  items-center '>

                    <form
                        onSubmit={formhandel}
                        className={` backdrop-blur-2xl  border border-yellow-400/50 bg-yellow-400/15 relative lg:w-100 lg:p-5 w-80 md:w-180 p-5 md:p-15 rounded-2xl shadow-lg flex flex-col items-center justify-center`}>

                        <h1 className='absolute md:top-13 lg:top-6 top-5 text-2xl lg:text-2xl uppercase font-bold md:text-5xl'>Teacher Data</h1>

                        <input
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            placeholder='Full Name'
                            required
                            className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10 mt-15 md:w-120 md:h-20 md:mt-20 lg:w-80 lg:h-13 lg:mt-18'
                            type="text"
                        />
                            <select
                                value={subject}
                                onChange={(e) => setsubject(e.target.value)}
                                required
                                className="bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10  md:w-120 md:h-20 lg:mt-5 mt-5 md:mt-10 lg:w-80 lg:h-13 outline-none appearance-none cursor-pointer"
                            >
                                <option value="" className="text-black">Subject</option>
                                <option value="DBMS" className="text-black">DBMS</option>
                                <option value="OPERATING SYSTEM" className="text-black">OS</option>
                                <option value="Computer Networks" className="text-black">Computer Networks</option>
                                <option value="Java" className="text-black">Java</option>
                                <option value="Software Engineering" className="text-black">Software Engineering</option>

                            </select>

                        


                        <input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder='Email'
                            required
                            className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10  md:w-120 md:h-20 lg:mt-5 mt-5 md:mt-10 lg:w-80 lg:h-13 '
                            type="email"
                        />
                        <input
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
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
                {RegisterdSuccess && !error && (

                    <div className='w-1200 h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-2000 backdrop-blur-xs   bg-black/50 flex items-center justify-center'>
                        <div className='lg:w-120 lg:h-115 w-70 flex-col lg:justify-between h-70 bg-green-500/10 backdrop-blur-2xl border border-green-400/50  rounded-2xl flex items-center justify-center'>
                            <div className='w-25 h-25 lg:w-40 lg:h-40 lg:mt-8  mt-2 rounded-full flex justify-center items-center overflow-hidden bg-white/10 border border-white/50'>
                                <img className=' object-cover object-center w-30 h-30 lg:w-50 lg:h-50 lg:mt-9 mt-5 ' src={teacher} alt="student" />
                            </div>
                            <div className='w-full flex flex-col items-center justify-center h-20 lg:mb-12'>
                                <h1 className='text-white-500 lg:text-2xl '>Teacher Registered Succesfully !! </h1>
                                <h1 className='lg:mt-2 lg:text-2xl'><span className='text-orange-400  '> Name : </span> {registeredData?.name}</h1>
                                <h1 className='lg:mt-2 lg:text-2xl'><span className='text-green-500 lg:text-2xl'>Email : </span> {registeredData?.email}</h1>

                            </div>
                            <div className='flex w-full h-20 gap-4 items-center justify-center'>
                                <button onClick={okbuttonhandel} className='bg-white/20 hover:bg-green-600 active:scale-95 duration-300 lg:mb-5 border rounded-2xl w-20 h-12 text-xl uppercase flex items-center justify-center'>ok</button>
                                <button onClick={checkbuttonhandel} className='bg-white/20 hover:bg-green-600 active:scale-95 duration-300 lg:mb-5 lg:w-60 border rounded-2xl w-37 h-12 text-l uppercase flex items-center justify-center'>check Teachers</button>
                            </div>
                        </div>
                    </div>

                )} 
                {error &&(
                    <div className='w-1200 h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-2000 backdrop-blur-xs bg-black/50 flex items-center justify-center'>
                        <div className='lg:w-120 relative lg:h-120 w-70 flex-col   h-70 bg-green-500/10 backdrop-blur-2xl border border-green-400/50  rounded-2xl flex items-center justify-center'>
                        <h1 className='text-2xl text-red-500'>{error}</h1>
                        <button onClick={ErrorOK} className='absolute bottom-4 w-30 h-12 bg-white/20 border rounded-2xl flex items-center justify-center border-white/50'>OK</button>
                    </div> 
                    </div> 

                )}
                <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                                <h1 className=' uppercase '>
                                    designed and devoloped by Soham Dutta
                                </h1>
                            </div>

            </div>

        </>

    )
}

export default TeacherRegister
