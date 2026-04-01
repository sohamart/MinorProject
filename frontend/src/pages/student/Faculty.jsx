import React from 'react'
import { Mail } from "lucide-react";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Faculty = () => {

    const [teachers, setteachers] = useState([])
    const [error, seterror] = useState(null)
    const API = import.meta.env.VITE_API_URI
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(`${API}/api/auth/getAllteacher`,
                    { withCredentials: true }
                );

                setteachers(response.data.teacheruserdata)
                seterror(null);
                setloading(false);

            } catch (error) {
                console.error('Error fetching :', error);
                setteachers([]);
                seterror(error.message);
                setloading(false);
            }
        };

        fetchTeachers();
    }, [])

    return (
        <div className='h-full relative w-full flex flex-col items-center rounded-2xl lg:bg-black/15 border border-white/50'>

            {/* Heading */}
            <div className='lg:w-120 w-50 lg:h-20 bg-white/5 border  border-white/20 rounded-2xl mt-2 flex items-center justify-center'>
                <h1 className='lg:text-3xl h-15 text-center flex justify-center items-center text-lg uppercase font-bold'>our faculties</h1>
            </div>

            {/* Container */}
            <div className='flex overflow-auto flex-wrap gap-4 w-full mt-4 p-4 lg:p-8 justify-center lg:justify-between items-center lg:items-start'>

                {teachers.map((teacher, index) => (
                    <div key={index} className='card mt-4 w-full max-w-[500px] lg:w-120 p-4 lg:h-30 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-4 backdrop-blur-2xl bg-gray-900/26 shadow-lg hover:shadow-yellow-200/10 hover:scale-[1.02] transition-all duration-300 border border-white/50'>

                        {/* Image */}
                        <div className='border bg-blue-500 border-blue-500 rounded-full w-20 h-20 flex items-center justify-center overflow-hidden'>
                            <img
                                src="https://t3.ftcdn.net/jpg/08/12/63/16/360_F_812631683_ek5GhlY2zdlSILJMT7pHFujzi37i4Os4.jpg"
                                alt="avatar"
                                className="w-19  h-19 rounded-full object-cover object-center"
                            />
                        </div>

                        {/* Name + Subject */}
                        <div className='border bg-white/10 border-amber-50 w-full lg:w-65 rounded-2xl flex flex-col items-center justify-center p-2'>
                            <h1 className='text-sm lg:text-lg text-center'>
                                <span className='text-green-400'>Name: </span> {teacher.name}
                            </h1>
                            <p className='text-xs lg:text-base text-center'>
                                <span className='text-yellow-400'>Subject: </span> {teacher.subject}
                            </p>
                        </div>

                        {/* Email */}
                        <div className='border bg-white/10 border-amber-50 flex items-center justify-center w-full lg:w-20 h-16 lg:h-21 rounded-2xl'>
                            <a
                                href={`mailto:${teacher.email}?subject=Student Query&body=Hello Sir,`}
                                className="flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10 rounded-2xl lg:rounded-full bg-blue-500 hover:scale-110 transition duration-300"
                            >
                                <Mail className="text-white" />
                            </a>

                        </div>

                    </div>
                ))}

                {/* Error */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Loading */}
                {loading && (
                    <p className="text-2xl lg:text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        Loading...
                    </p>
                )}

            </div>

        </div>
    )
}

export default Faculty