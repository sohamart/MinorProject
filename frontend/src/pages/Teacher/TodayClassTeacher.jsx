import React, { useContext, useState } from 'react'
import { ClassContextData } from '../../context/ClassContext'
import axios from 'axios'

const TodayClassTeacher = () => {

    const { TodayClass: TodayData, loading } = useContext(ClassContextData)

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const [formData, setFormData] = useState({
        subject: "",
        teacher: "",
        type: "",
        startTime: "10:00 AM",
        endTime: "11:00 AM"
    })

    const API = import.meta.env.VITE_API_URI

    // ⏱️ TIME CONVERT
    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(" ")
        let [hours, minutes] = time.split(":")
        if (hours === "12") hours = "00"
        if (modifier === "PM") hours = parseInt(hours) + 12
        return `${hours}:${minutes}`
    }

    const convertTo12Hour = (time24h) => {
        let [hours, minutes] = time24h.split(":")
        let modifier = "AM"
        if (hours >= 12) {
            modifier = "PM"
            if (hours > 12) hours -= 12
        }
        if (hours == 0) hours = 12
        return `${hours}:${minutes} ${modifier}`
    }

    // ✅ ADD CLASS
    const handleAddClass = async () => {
        try {
            const newClass = {
                classes: [{
                    subject: formData.subject,
                    teacher: formData.teacher,
                    type: formData.type,
                    time: `${formData.startTime} - ${formData.endTime}`
                }]
            }

            await axios.post(
                `${API}/api/class/today/add`,
                newClass,
                { withCredentials: true }
            )

            setShowAdd(false)
            window.location.reload()

        } catch (err) {
            console.log(err.response?.data)
            alert("Add failed")
        }
    }

    // ✅ DELETE CLASS
    const handleDeleteClass = async (classId) => {
        try {
            await axios.delete(
                `${API}/api/class/today/delete/${classId}`,
                { withCredentials: true }
            )

            window.location.reload()

        } catch (err) {
            console.log(err.response?.data)
            alert("Delete failed")
        }
    }

    // ✅ OPEN EDIT
    const openEdit = (cls, index) => {
        setSelectedIndex(index)
        setFormData({
            subject: cls.subject,
            teacher: cls.teacher,
            type: cls.type,
            startTime: cls.time.split(" - ")[0],
            endTime: cls.time.split(" - ")[1],
        })
        setShowEdit(true)
    }

    // ✅ UPDATE CLASS (FIXED)
    const handleUpdateClass = async () => {
        try {
            const updatedClasses = [...TodayData.classes]

            updatedClasses[selectedIndex] = {
                subject: formData.subject,
                teacher: formData.teacher,
                type: formData.type,
                time: `${formData.startTime} - ${formData.endTime}`
            }

            await axios.put(
                `${API}/api/class/today/edit/${TodayData._id}`,
                { classes: updatedClasses },
                { withCredentials: true }
            )

            setShowEdit(false)
            window.location.reload()

        } catch (err) {
            console.log(err.response?.data)
            alert("Update failed")
        }
    }

    return (
        <>
            <div className='relative text-white h-full w-full lg:bg-black/5 bg-black/20 flex flex-col items-center border border-white/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'>

                {/* HEADER */}
                <div className='lg:w-120 h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
                    <h1 className='lg:text-3xl flex h-18 items-center justify-center uppercase font-bold'>Today Class</h1>
                </div>

                {/* ADD BUTTON */}
                <button
                    onClick={() => setShowAdd(true)}
                    className='absolute right-2 top-22 bg-green-400/20 border border-green-400/50 px-3 py-2 rounded-xl'
                >
                    ADD
                </button>

                <div className='flex gap-12 pt-24 pb-24 w-full flex-col overflow-auto no-scrollbar items-center'>

                    {TodayData === null && (
                        <p className="text-white text-xl">No classes Found !!</p>
                    )}

                    {!loading && TodayData && (
                        <div>
                            <div className='card bg-white/10 border lg:w-180 flex p-2 border-white/50 gap-4 flex-col items-center w-80 rounded-2xl'>

                                <h1 className='text-2xl font-bold uppercase mt-2'>{TodayData.day}</h1>

                                {TodayData.classes.map((cls, index) => (
                                    <div key={index} className='w-full uppercase lg:text-2xl p-4 bg-black/30 rounded-2xl border border-white/50'>

                                        {/* BUTTONS */}
                                        <div className='flex justify-end gap-2 mb-2'>
                                            <button onClick={() => openEdit(cls, index)} className='text-blue-400'>Edit</button>
                                            <button onClick={() => handleDeleteClass(cls._id)} className='text-red-400'>Delete</button>
                                        </div>

                                        <h1 className='w-full h-12 bg-blue-600/10 border rounded-2xl border-blue-500/50 flex justify-around'>
                                            <span className='font-bold text-blue-400'>Class</span> : {cls.subject}
                                        </h1>

                                        <div className='w-full mt-4 p-2 bg-white/5 border rounded-2xl flex flex-col gap-4'>
                                            <h1 className='bg-green-400/20 border rounded-xl text-center'>Sir : {cls.teacher}</h1>
                                            <h1 className='bg-red-400/20 border rounded-xl text-center'>Time : {cls.time}</h1>
                                            <h1 className='bg-yellow-400/20 border rounded-xl text-center'>Type : {cls.type}</h1>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    )}

                </div>

                {/* ADD MODAL */}
                {showAdd && (
                    <div className='fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-3'>
                        <div className='bg-black/80 border border-white/40 p-5 rounded-2xl w-full max-w-[500px]'>

                            <h2 className='text-xl mb-4 text-center'>Add Class</h2>

                            <input placeholder='Subject'
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30'
                            />

                            <input placeholder='Teacher'
                                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30'
                            />

                            <div className='flex gap-2 mb-3'>
                                <input type="time"
                                    className='w-full p-3 bg-white/10 rounded-xl border border-white/30'
                                    onChange={(e) => setFormData({ ...formData, startTime: convertTo12Hour(e.target.value) })}
                                />
                                <input type="time"
                                    className='w-full p-3 bg-white/10 rounded-xl border border-white/30'
                                    onChange={(e) => setFormData({ ...formData, endTime: convertTo12Hour(e.target.value) })}
                                />
                            </div>

                            <select
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className='w-full mb-4 p-3 bg-white/10 rounded-xl border border-white/30'
                            >
                                <option value="">Type</option>
                                <option value="Theory">Theory</option>
                                <option value="Lab">Lab</option>
                            </select>

                            <div className='flex gap-3'>
                                <button onClick={() => setShowAdd(false)} className='w-full bg-red-500/20 border border-red-400/40 py-2 rounded-xl'>
                                    Cancel
                                </button>
                                <button onClick={handleAddClass} className='w-full bg-green-500/20 border border-green-400/40 py-2 rounded-xl'>
                                    Add
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* EDIT MODAL */}
                {showEdit && (
                    <div className='fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-3'>
                        <div className='bg-black/80 border border-white/40 p-5 rounded-2xl w-full max-w-[500px]'>

                            <h2 className='text-xl mb-4 text-center'>Edit Class</h2>

                            <input value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30'
                            />

                            <input value={formData.teacher}
                                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30'
                            />

                            <div className='flex gap-2 mb-3'>
                                <input type="time"
                                    value={convertTo24Hour(formData.startTime)}
                                    onChange={(e) => setFormData({ ...formData, startTime: convertTo12Hour(e.target.value) })}
                                    className='w-full p-3 bg-white/10 rounded-xl border border-white/30'
                                />
                                <input type="time"
                                    value={convertTo24Hour(formData.endTime)}
                                    onChange={(e) => setFormData({ ...formData, endTime: convertTo12Hour(e.target.value) })}
                                    className='w-full p-3 bg-white/10 rounded-xl border border-white/30'
                                />
                            </div>

                            <select value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className='w-full mb-4 p-3 bg-white/10 rounded-xl border border-white/30'
                            >
                                <option value="">Type</option>
                                <option value="Theory">Theory</option>
                                <option value="Lab">Lab</option>
                            </select>

                            <div className='flex gap-3'>
                                <button onClick={() => setShowEdit(false)} className='w-full bg-red-500/20 border border-red-400/40 py-2 rounded-xl'>
                                    Cancel
                                </button>
                                <button onClick={handleUpdateClass} className='w-full bg-green-500/20 border border-green-400/40 py-2 rounded-xl'>
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default TodayClassTeacher