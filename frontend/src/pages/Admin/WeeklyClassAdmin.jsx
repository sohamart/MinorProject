import React, { useContext, useState } from 'react'
import { ClassContextData } from '../../context/ClassContext'
import axios from 'axios'

const WeeklyClassAdmin = () => {
    const { WeeklyClass, error, loading } = useContext(ClassContextData)

    const [editData, setEditData] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState(null)

    const API = import.meta.env.VITE_API_URI

    // ✅ Edit
    const handleEdit = (data) => {
        const formatted = {
            ...data,
            classes: data.classes.map(cls => ({
                ...cls,
                startTime: cls.time.split(" - ")[0],
                endTime: cls.time.split(" - ")[1],
            }))
        }
        setEditData(formatted)
        setShowForm(true)
    }

    // ⏱️ Time convert
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

    // ✅ Update
    const handleUpdate = async () => {
        const finalData = {
            day: editData.day,
            classes: editData.classes.map(cls => ({
                subject: cls.subject,
                teacher: cls.teacher,
                type: cls.type,
                time: `${cls.startTime} - ${cls.endTime}`
            }))
        }

        try {
            setUpdating(true)
            setUpdateError(null)

            await axios.put(
                `${API}/api/class/weekly/edit/${editData._id}`,
                finalData,
                { withCredentials: true }
            )

            setShowForm(false)
            window.location.reload()

        } catch (err) {
            setUpdateError(
                err.response?.data?.message || "Update failed"
            )
        } finally {
            setUpdating(false)
        }
    }

    return (
        <>
            <div className='relative text-white h-full w-full lg:bg-black/5 bg-black/20 flex flex-col items-center border border-white/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-3 lg:p-6'>

                {/* HEADER */}
                <div className='lg:w-120 w-60 h-16 lg:h-20 bg-white/10 border border-white/30 rounded-2xl flex items-center justify-center mb-6'>
                    <h1 className='lg:text-3xl text-xl uppercase font-bold'>Weekly Class</h1>
                </div>

                {/* ERROR */}
                {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

                {/* LOADING */}
                {loading && (
                    <div className="flex flex-col gap-4 w-full items-center">
                        {[1,2,3].map((_,i)=>(
                            <div key={i} className="w-[95%] lg:w-[700px] h-40 bg-white/10 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                )}
              <div className='w-full overflow-auto no-scrollbar'>
                


                {/* DATA */}
                {!loading && WeeklyClass?.length > 0 && WeeklyClass.map((dayData, i) => (
                    <div key={i} className="w-full flex justify-center mb-6">

                        <div className='bg-white/10 border lg:w-[700px] w-[95%] flex p-4 border-white/40 gap-6 flex-col items-center rounded-2xl shadow-lg'>
                            <div className='flex justify-between w-full '>
                                <h1 className='text-2xl font-bold uppercase'>{dayData.day}</h1>

                            {/* EDIT BUTTON */}
                            <button
                                onClick={() => handleEdit(dayData)}
                                className='bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-300 px-5 py-2 rounded-xl hover:bg-blue-500/30 transition'
                            >
                                Edit
                            </button>
                            </div>
                            

                            {dayData.classes.map((cls, index) => (
                                    <div key={index} className='w-full  uppercase lg:text-2xl p-4  bg-black/30 rounded-2xl border border-white/50'> 
                                        <h1 className='w-full h-12 bg-blue-600/10 border items-center rounded-2xl border-blue-500/50 flex justify-around '><span className='font-bold text-blue-400'>Class    </span> <span>:</span> {cls.subject}</h1>
                                        
                                        <div className='w-full mt-4 lg:p-22 uppercase p-2 h-34 lg:h-50 gap-4 justify-center bg-white/5 border border-white/50 rounded-2xl flex flex-col '>
                                        <h1 className='w-full flex justify-around bg-green-400/20 border border-green-300/50 rounded-2xl items-center lg:h-28 h-8'><span className='font-bold text-green-400'>Sir    </span> <span>:</span> {cls.teacher}</h1>
                                        <h1 className='w-full flex justify-around bg-red-400/20 border border-red-300/50 rounded-2xl items-center lg:h-28 h-8'><span className='font-bold text-red-400'>Time      </span> <span>:</span> {cls.time}</h1>
                                        <h1 className='w-full flex justify-around bg-yellow-400/20 border border-yellow-300/50 rounded-2xl items-center lg:h-28 h-8'><span className='font-bold text-yellow-400'>Type    </span> <span>:</span> {cls.type}</h1>
                                        </div>
                                    </div>
                                    
                                    ))}

                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {showForm && editData && (
                <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-3'>

                    <div className='bg-black/80 border border-white/40 p-5 lg:p-8 rounded-2xl w-full max-w-[600px]'>

                        <h2 className='text-2xl mb-3'>Edit Day</h2>

                        {updateError && (
                            <p className="text-red-500 mb-3">{updateError}</p>
                        )}

                        <input
                            value={editData.day}
                            onChange={(e) => setEditData({ ...editData, day: e.target.value })}
                            className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30 focus:border-blue-400 outline-none'
                        />

                        {editData.classes.map((cls, index) => (
                            <div key={index} className='mb-4 border border-white/30 p-3 rounded-xl'>

                                <input
                                    value={cls.subject}
                                    onChange={(e) => {
                                        const updated = [...editData.classes]
                                        updated[index].subject = e.target.value
                                        setEditData({ ...editData, classes: updated })
                                    }}
                                    className='w-full mb-2 p-2 bg-white/10 rounded'
                                />

                                <input
                                    value={cls.teacher}
                                    onChange={(e) => {
                                        const updated = [...editData.classes]
                                        updated[index].teacher = e.target.value
                                        setEditData({ ...editData, classes: updated })
                                    }}
                                    className='w-full mb-2 p-2 bg-white/10 rounded'
                                />

                                <div className='flex gap-2'>
                                    <input
                                        type="time"
                                        value={convertTo24Hour(cls.startTime)}
                                        onChange={(e) => {
                                            const updated = [...editData.classes]
                                            updated[index].startTime = convertTo12Hour(e.target.value)
                                            setEditData({ ...editData, classes: updated })
                                        }}
                                        className='w-full p-2 bg-white/10 rounded'
                                    />

                                    <input
                                        type="time"
                                        value={convertTo24Hour(cls.endTime)}
                                        onChange={(e) => {
                                            const updated = [...editData.classes]
                                            updated[index].endTime = convertTo12Hour(e.target.value)
                                            setEditData({ ...editData, classes: updated })
                                        }}
                                        className='w-full p-2 bg-white/10 rounded'
                                    />
                                </div>
                            </div>
                        ))}

                        <div className='flex justify-between mt-4 gap-3'>
                            <button
                                onClick={() => setShowForm(false)}
                                className='w-full bg-red-500/20 border border-red-400/40 text-red-300 py-2 rounded-xl'
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                disabled={updating}
                                className='w-full bg-green-500/20 border border-green-400/40 text-green-300 py-2 rounded-xl flex justify-center items-center gap-2'
                            >
                                {updating ? (
                                    <>
                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Updating...
                                    </>
                                ) : "Update"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
              </div>
                
            

            {/* MODAL */}
            {showForm && editData && (
                <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-3'>

                    <div className='bg-black/80 border border-white/40 p-5 lg:p-8 rounded-2xl w-full max-w-[600px]'>

                        <h2 className='text-2xl mb-3'>Edit Day</h2>

                        {updateError && (
                            <p className="text-red-500 mb-3">{updateError}</p>
                        )}

                        <input
                            value={editData.day}
                            onChange={(e) => setEditData({ ...editData, day: e.target.value })}
                            className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30 focus:border-blue-400 outline-none'
                        />

                        {editData.classes.map((cls, index) => (
                            <div key={index} className='mb-4 border border-white/30 p-3 rounded-xl'>

                                <input
                                    value={cls.subject}
                                    onChange={(e) => {
                                        const updated = [...editData.classes]
                                        updated[index].subject = e.target.value
                                        setEditData({ ...editData, classes: updated })
                                    }}
                                    className='w-full mb-2 p-2 bg-white/10 rounded'
                                />

                                <input
                                    value={cls.teacher}
                                    onChange={(e) => {
                                        const updated = [...editData.classes]
                                        updated[index].teacher = e.target.value
                                        setEditData({ ...editData, classes: updated })
                                    }}
                                    className='w-full mb-2 p-2 bg-white/10 rounded'
                                />

                                <div className='flex gap-2'>
                                    <input
                                        type="time"
                                        value={convertTo24Hour(cls.startTime)}
                                        onChange={(e) => {
                                            const updated = [...editData.classes]
                                            updated[index].startTime = convertTo12Hour(e.target.value)
                                            setEditData({ ...editData, classes: updated })
                                        }}
                                        className='w-full p-2 bg-white/10 rounded'
                                    />

                                    <input
                                        type="time"
                                        value={convertTo24Hour(cls.endTime)}
                                        onChange={(e) => {
                                            const updated = [...editData.classes]
                                            updated[index].endTime = convertTo12Hour(e.target.value)
                                            setEditData({ ...editData, classes: updated })
                                        }}
                                        className='w-full p-2 bg-white/10 rounded'
                                    />
                                </div>
                            </div>
                        ))}

                        <div className='flex justify-between mt-4 gap-3'>
                            <button
                                onClick={() => setShowForm(false)}
                                className='w-full bg-red-500/20 border border-red-400/40 text-red-300 py-2 rounded-xl'
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                disabled={updating}
                                className='w-full bg-green-500/20 border border-green-400/40 text-green-300 py-2 rounded-xl flex justify-center items-center gap-2'
                            >
                                {updating ? (
                                    <>
                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Updating...
                                    </>
                                ) : "Update"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default WeeklyClassAdmin