import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginStudent from '../../components/login/StudentLogin/'
import LoginTeacher from '../../components/login/TeacherLogin/'
import LoginAdmin from '../../components/login/AdminLogin/'
import { useState, useContext, useEffect } from 'react'
import { AuthContextData } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'

const Login = () => {

    const [stlogin, setstlogin] = useState(true)
    const [trlogin, settrlogin] = useState(false)
    const [adlogin, setadlogin] = useState(false)

    const { loggedinStudent, loggedinAdmin, loggedinTeacher, loading } = useContext(AuthContextData)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedinStudent !== null) navigate("/student/home")
        else if (loggedinAdmin !== null) navigate("/admin/home")
        else if (loggedinTeacher !== null) navigate("/teacher/home")
    }, [loggedinStudent, loggedinAdmin, loggedinTeacher])

    if (loading) return <Loading />

    const onhandelstudent = () => {
        setstlogin(true)
        settrlogin(false)
        setadlogin(false)
    }

    const onhandelteacher = () => {
        settrlogin(true)
        setstlogin(false)
        setadlogin(false)
    }

    const onhandeladmin = () => {
        setadlogin(true)
        setstlogin(false)
        settrlogin(false)
    }

    return (
        <div className='flex  w-screen h-screen overflow-hidden text-white pl-4 pr-4 pb-4'>

            <div className='w-full relative h-full flex flex-col rounded-2xl border-b border-l border-r border-white/30 backdrop-blur-2xl items-center'>

                {/* Title */}
                <div className='lg:w-120 w-50 lg:h-20 bg-white/10 backdrop-blur-lg border-b border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
                    <h1 className='lg:text-3xl h-15 text-center flex justify-center items-center text-lg uppercase font-bold'>
                        our faculties
                    </h1>
                </div>

                {/* Buttons */}
                <div className='w-full h-15 lg:w-120 md:w-full sm:w-full md:h-25 lg:h-12 flex items-center justify-center lg:rounded-2xl mt-7 gap-4 md:gap-10 lg:gap-12'>

                    <button
                        onClick={onhandelstudent}
                        className='active:scale-95 transition duration-300   hover:bg-green-500 border border-green-400/50 bg-green-400/30 w-23 h-12 lg:w-30 lg:h-12 md:w-40 md:h-22 md:text-3xl sm:w-30 sm:h-12 rounded-2xl lg:text-2xl flex items-center justify-center'>
                        Student
                    </button>

                    <button
                        onClick={onhandelteacher}
                        className='active:scale-95 transition duration-300 border border-yellow-400/50 bg-yellow-400/30 hover:bg-yellow-500  lg:w-30 lg:h-12 md:w-40 md:h-22 md:text-3xl sm:w-30 sm:h-12 rounded-2xl w-23 h-12 lg:text-2xl flex items-center justify-center'>
                        Teacher
                    </button>

                    <button
                        onClick={onhandeladmin}
                        className='active:scale-95 transition duration-300 border border-red-400/50 bg-red-400/30 hover:bg-red-500  lg:w-30 lg:h-12 md:w-40 md:h-22 md:text-3xl sm:w-30 sm:h-12 rounded-2xl w-23 h-12 lg:text-2xl flex items-center justify-center'>
                        Admin
                    </button>

                </div>

                {/* 💎 FORM SECTION (UPDATED ONLY THIS PART) */}

                <div className='relative w-80 h-100 md:w-180 md:h-220 lg:w-100 lg:h-120 flex items-center justify-center rounded-2xl mt-4 overflow-hidden'>

                    {/* 🧊 Glass Layer */}
                    

                    {/* ✨ Soft Light */}
                    

                    {/* 🔥 SAME DIRECTION ANIMATION */}
                    <AnimatePresence mode="wait">

                        {stlogin && (
                            <motion.div
                                key="student"
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -80 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="absolute w-full h-full flex items-center justify-center p-4"
                            >
                                <LoginStudent open={stlogin} />
                            </motion.div>
                        )}

                        {trlogin && (
                            <motion.div
                                key="teacher"
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -80 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="absolute w-full h-full flex items-center justify-center p-4"
                            >
                                <LoginTeacher open={trlogin} />
                            </motion.div>
                        )}

                        {adlogin && (
                            <motion.div
                                key="admin"
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -80 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="absolute w-full h-full flex items-center justify-center p-4"
                            >
                                <LoginAdmin />
                            </motion.div>
                        )}

                    </AnimatePresence>

                </div>
                        <h1 className='lg:text-xl md:text-3xl text-white lg:mt-0 mt-4 '>*please select login role to open form*</h1>
            
            
            <div className='absolute bottom-[-14px] text-[8px] text-center opacity-20 flex justify-center items-center w-full'>
                        <h1 className=' uppercase '>
                designed and devoloped by Soham Dutta
            </h1>
            </div>
            
            
        </div>
            </div>
            
    )
}

export default Login