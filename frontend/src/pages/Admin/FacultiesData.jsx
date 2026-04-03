import React from 'react'
import { Mail } from "lucide-react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MessageCircleMore } from "lucide-react";
import { Ban } from "lucide-react";

const FacultiesData = () => {

    const [teachers, setteachers] = useState([])
    const [error, seterror] = useState(null)
    const API = import.meta.env.VITE_API_URI
    const [loading, setloading] = useState(true)
    const [deletingId, setDeletingId] = useState(null);

    

    const deleteTeacher = async (id) => {
        if (!window.confirm("Are you sure to delete this student ?")) return;

        setDeletingId(id);

        try {
            await axios.delete(`${API}/api/auth/deleteTeacher/${id}`, {
                withCredentials: true
            });




        } catch (error) {
            console.error(error);
        } finally {
            await fetchTeachers();
            setDeletingId(null);
        }
    };
    const fetchTeachers = async () => {
        try {
            const response = await axios.get(`${API}/api/auth/getAllteacher`,
                { withCredentials: true }
            );

            setteachers(response.data.teacheruserdata)
            seterror(null);
            

        } catch (error) {
            console.error('Error fetching :', error);
            setteachers([]);
            seterror(error.message);
            setloading(false);
        }
    };


    useEffect(() => {


        fetchTeachers();
    }, [])

    return (
        <div className='h-full relative w-full  flex flex-col items-center rounded-2xl  border border-white/50'>

            {/* Heading */}
            <div className='lg:w-120 h-18 mb-8 w-50 lg:h-20 bg-white/10 border-r border-l border-b border-white/40  shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
                <h1 className='lg:text-3xl h-18 text-center flex justify-center items-center text-lg uppercase font-bold'>our faculties</h1>
            </div>

            {/* Container */}
            <div className='overflow-y-scroll no-scrollbar h-full pt-8 pb-30 bg-black/20    shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-xl [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] flex overflow-auto flex-wrap lg:gap-4 w-full mt-4 p-4 lg:p-8 justify-center lg:justify-between items-center lg:items-start'>

                {teachers.map((teacher, index) => (
                    <div key={index} className='card mt-15 lg:h-70 lg:mt-4 w-full max-w-[500px] lg:max-w-[530px]  p-4  rounded-2xl flex flex-col  items-center justify-center gap-4  backdrom-blur-md bg-white/10 shadow-lg hover:shadow-yellow-200/10 hover:scale-[1.02] transition-all duration-300 border border-white/50'>

                        {/* Image */}
                        <div className=' flex lg:flex-row flex-col w-full gap-4 justify-center items-center'>
                            <div className='border-2 bg-yellow-500  border-yellow-500 rounded-full  w-20 h-20 flex items-center justify-center overflow-hidden'>
                                <img
                                    src="https://t3.ftcdn.net/jpg/08/12/63/16/360_F_812631683_ek5GhlY2zdlSILJMT7pHFujzi37i4Os4.jpg"
                                    alt="avatar"
                                    className="w-19  h-19 rounded-full object-cover object-center"
                                />
                            </div>

                            {/* Name + Subject */}
                            <div className='border  bg-green-400/10 border-green-400/30 w-full lg:w-70 rounded-2xl flex flex-col items-center justify-center p-2'>
                                <h1 className='text-sm lg:text-lg text-center'>
                                    <span className='text-green-400'>Name: </span> {teacher.name}
                                </h1>
                                <p className='text-xs mt-4 lg:text-base text-center'>
                                    <span className='text-yellow-400'>Subject: </span> {teacher.subject}
                                </p>
                                <p className='text-xs mt-2 lg:text-base text-center'>
                                    <span className='text-blue-400'>Type: </span> Teacher (Class Change Access)
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex  w-full  gap-4 justify-center items-center">
                            <div className='border  gap-4 bg-blue-500/10 border-blue-500/30 flex items-center justify-center p-2 lg:w-25 h-16 lg:h-21 rounded-2xl'>
                                <a
                                    href={`mailto:${teacher.email}?subject=Student Query&body=Hello Sir,`}
                                    className="flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10 rounded-2xl lg:rounded-full bg-white/10 border border-white/50 hover:scale-95 transition duration-300"
                                >
                                    <Mail className="text-white" />
                                </a>

                                {/* <a
                                                                        className="flex lg:hidden items-center justify-center w-12 h-12 lg:w-10 lg:h-10 rounded-2xl lg:rounded-full bg-white/10 border border-white/50 hover:scale-95 transition duration-300"
                                        
                                                                        href="https://wa.me/919647085384?text=Hello%20sir%2C%20I%20want%20to%20contact%20you%20about%20your%20class">
                                        
                                                                        <MessageCircleMore className="text-white" />
                                                                    </a> */}



                            </div>
                            <div className='w-full'>
                                <button onClick={() => deleteTeacher(teacher._id)} className="h-14 text-2xl w-full rounded-2xl flex items-center justify-center border active:scale-95 hover:bg-white hover:text-black  hover:scale-105 transition duration-300 hover:border-black/50 border-red-400/50 bg-red-400/20 ">

                                    {deletingId === teacher._id ? "Loading..." : "Delete"}

                                </button>
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
                {loading && (
                    <p className="text-2xl lg:text-4xl absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        Loading...
                    </p>
                )}
                {teachers.length === 0 && !loading && !error && (
                    <div className='absolute w-90 flex gap-2 flex-col items-center  justify-center top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Ban className='w-10 h-10' />


                        <p className="text-2xl text-center lg:text-4xl ">
                            No teachers found !!.
                        </p>
                    </div>
                )}



            </div>
            <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
                <h1 className=' uppercase '>
                    designed and devoloped by Soham Dutta
                </h1>
            </div>

        </div>
    )
}

export default FacultiesData