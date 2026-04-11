import React, { useContext, useState } from 'react'
import { ClassContextData } from '../../context/ClassContext'
import axios from 'axios'


const WeeklyClassAdmin = () => {
  const { WeeklyClass, error, loading } = useContext(ClassContextData)
  const [deletinig, setdeletinig] = useState(false)

  const [editData, setEditData] = useState(null)
  const [deleteFlash, setdeleteFlash] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [addData, setaddData] = useState(null)

  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [adding, setadding] = useState(false)
  const [addError, setaddError] = useState(null)

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
  // ✅ Add
  const handleAdd = (data) => {
    setaddData(data)
    setShowAddForm(true)
  }


  // ❌ DELETE
  const handleDelete = async (day) => {
    setdeletinig(true)
    try {
      const confirmDelete = window.confirm(`Delete ${day} classes?`)
      if (!confirmDelete) return

      await axios.delete(
        `${API}/api/class/weekly/delete/${day}`,
        { withCredentials: true }
      )

      
      setdeletinig(false)

      setdeleteFlash(true)

      
      


    } catch (err) {
      console.log("DELETE ERROR:", err)
      alert("Delete failed")
    }
    finally{
      setTimeout(() => {
        setdeleteFlash(false)
        window.location.reload()
      }, 3000);
      
      
      
    }
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
      setEditData(null)

      window.location.reload()

    } catch (err) {
      setUpdateError(err.response?.data?.message || "Update failed")
    } finally {
      setUpdating(false)
    }
  }
const addClass = async () => {

  const validClasses = addData.classes.filter(cls =>
    cls.subject && cls.teacher && cls.type && cls.startTime && cls.endTime
  )

  if (validClasses.length === 0) {
    setaddError("At least one valid class required")
    return
  }

  const finalAddData = {
    day: addData.day,
    classes: validClasses.map(cls => ({
      subject: cls.subject,
      teacher: cls.teacher,
      type: cls.type,
      time: `${cls.startTime} - ${cls.endTime}`
    }))
  }

  try {
    setadding(true)
    setaddError(null)

    const response = await axios.post(
      `${API}/api/class/weekly/add`,
      finalAddData,
      { withCredentials: true }
    )

    // 🔥 MAIN FIX
    alert(response.data.message)

    // only success হলে close হবে
    if (response.status === 200 || response.status === 201) {
      setShowAddForm(false)
      setaddData(null)
      window.location.reload()
    }

  } catch (err) {
    setaddError(err.response?.data?.message || "Add failed")
  } finally {
    setadding(false)
  }
}
  return (
    <>
      <div className='relative text-white h-full w-full lg:bg-black/5 bg-black/20 flex flex-col items-center border border-white/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-3 lg:p-6'>

        {/* HEADER */}
        <div className='lg:w-120 w-60  h-16 lg:h-20 bg-white/10 border border-white/30 rounded-2xl flex items-center justify-center mb-6'>
          <h1 className='lg:text-3xl h-18 flex items-center justify-center text-xl uppercase font-bold'>Weekly Class</h1>
        </div>
        <div className='absolute left-5 lg:left-120 lg:top-28  lg:w-120 w-42 top-24'>
          <h1 className='text-xs text-red-600' >
            ***All Changed data update after 24 hrs***
          </h1>
        </div>
        <div>
          <button
            onClick={() =>
              handleAdd({
                day: "Monday",
                classes: [
                  {
                    subject: "",
                    teacher: "",
                    type: "",
                    startTime: "10:00 AM",
                    endTime: "11:00 AM",
                  },
                ],
              })
            }
            className='bg-green-400/20 z-12 border-l-2  border-t-2 border-b-2 absolute right-0 top-22 border-green-400/50 backdrop-blur-2xl rounded-l-2xl lg:w-40 lg:h-15 active:scale-95  w-30 h-12'
          >
            ADD CLASS
          </button>
        </div>
        {deleteFlash && (
          <div className='w-screen bottom-[-20px] right-[-20px] h-screen absolute z-222 bg-black/40 backdrop-blur-md flex justify-center items-center '>
              <div className='w-65  bg-white/10 border flex justify-center items-center border-green-400/50 rounded-2xl h-60  '>
                  <h1 className='text-2xl text-green-500'>Deleted Sucessfull !!</h1>
              </div>
          </div>
         )

        } 
        {WeeklyClass?.length === 0 && <p className="text-White mt-14 text-lg mb-4">No classes Found !!</p>}

        {loading && (
          <div className="flex flex-col gap-4 w-full items-center">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="w-[95%] lg:w-[700px] h-40 bg-white/10 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        )}

        <div className='w-full pb-24 pt-24 overflow-auto shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-xl [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]  no-scrollbar'>

          {!loading && WeeklyClass?.length > 0 && WeeklyClass.map((dayData, i) => (
            <div key={i} className="w-full flex justify-center mb-6">

              <div className='bg-white/10 border lg:w-[700px] w-[95%] flex p-4 border-white/40 gap-6 flex-col items-center rounded-2xl shadow-lg'>

                <div className='flex justify-between w-full'>

                  <h1 className='text-2xl font-bold uppercase'>{dayData.day}</h1>

                  {/* 🔥 BUTTON GROUP */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleEdit(dayData)}
                      className='bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-300 px-4 py-2 rounded-xl hover:bg-blue-500/30 transition'
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(dayData.day)}
                      className='bg-red-500/20 backdrop-blur-md border border-red-400/40 text-red-300 px-4 py-2 rounded-xl hover:bg-red-500/30 transition'
                    >
                      {deletinig ? ("deleting.."): ("delete")}
                      
                    </button>

                  </div>
                </div>

                {dayData.classes.map((cls, index) => (
                  <div key={index} className='w-full  uppercase lg:text-2xl p-4  bg-black/30 rounded-2xl border border-white/50'>
                    <h1 className='w-full h-12 bg-blue-600/10 border items-center rounded-2xl border-blue-500/50 flex justify-around '><span className='font-bold text-blue-400'>Class    </span> <span>:</span> {cls.subject}</h1>

                    <div className='w-full mt-4 lg:p-2 uppercase p-2 min-h-34 lg:min-h-30 gap-4 justify-center bg-white/5 border border-white/50 rounded-2xl flex flex-col '>
                      <h1 className='w-full flex justify-around bg-green-400/20 border border-green-300/50 rounded-2xl items-center lg:min-h-10 min-h-8'><span className='font-bold text-green-400'>Sir    </span> <span>:</span> {cls.teacher}</h1>
                      <h1 className='w-full flex justify-around bg-red-400/20 border border-red-300/50 rounded-2xl lg:text-xl text-xs items-center lg:min-h-10 min-h-8'><span className='font-bold  text-red-400'>Time      </span> <span>:</span> {cls.time}</h1>
                      <h1 className='w-full flex justify-around bg-yellow-400/20 border border-yellow-300/50 rounded-2xl items-center lg:min-h-10 min-h-8'><span className='font-bold text-yellow-400'>Type    </span> <span>:</span> {cls.type}</h1>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {showAddForm && addData && (
          <div className='fixed h-full justify-center   inset-0 bg-black/80 flex flex-col  items-center z-50 p-3'>

            <div className='bg-black/80 overflow-auto mb-12 no-scrollbar h-120 border border-white/40 p-5 lg:p-8 rounded-2xl w-full max-w-[600px]'>

              <h2 className='text-2xl mb-3'>Add Day</h2>

              {addError && (
                <p className="text-red-500 mb-3">{addError}</p>
              )}

              {/* DAY SELECT */}
              <select
                value={addData.day}

                onChange={(e) => setaddData({ ...addData, day: e.target.value })}
                className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30'
              >
                <option className='text-black' value="Monday">Monday</option>
                <option className='text-black' value="Tuesday">Tuesday</option>
                <option className='text-black' value="Wednesday">Wednesday</option>
                <option className='text-black' value="Thursday">Thursday</option>
                <option className='text-black' value="Friday">Friday</option>
                <option className='text-black' value="Saturday">Saturday</option>
              </select>

              {/* CLASSES */}
              {addData.classes.map((cls, index) => (
                <div key={index} className='mb-4 border border-white/30 p-3 rounded-xl'>

                  {/* SUBJECT */}
                  <select
                    value={cls.subject}
                    onChange={(e) => {
                      const updated = [...addData.classes]
                      updated[index].subject = e.target.value
                      setaddData({ ...addData, classes: updated })
                    }}
                    className='w-full mb-2 p-2 bg-white/10 rounded border border-white/30'
                  >
                    <option className='text-black' value="">Select Subject</option>
                    <option className='text-black' value="DBMS">DBMS</option>
                    <option className='text-black' value="Operating System">OS</option>
                    <option className='text-black' value="Computer Network">Computer Network</option>
                    <option className='text-black' value="java">java</option>
                    <option className='text-black' value="Software Engineering">Software Engineering</option>
                  </select>

                  {/* TEACHER */}
                  <select
                    value={cls.teacher}
                    onChange={(e) => {
                      const updated = [...addData.classes]
                      updated[index].teacher = e.target.value
                      setaddData({ ...addData, classes: updated })
                    }}
                    className='w-full mb-2 p-2 bg-white/10 rounded border border-white/30'
                  >
                    <option className='text-black' value="">Select Teacher</option>
                    <option className='text-black' value="PGR">PGR</option>
                    <option className='text-black' value="TKP">TKP</option>
                    <option className='text-black' value="ND">ND</option>
                    <option className='text-black' value="AT">AT</option>
                    <option className='text-black' value="SS">SS</option>
                  </select>

                  {/* TIME */}
                  <div className='flex gap-2'>
                    <input
                      type="time"
                      value={convertTo24Hour(cls.startTime)}
                      onChange={(e) => {
                        const updated = [...addData.classes]
                        updated[index].startTime = convertTo12Hour(e.target.value)
                        setaddData({ ...addData, classes: updated })
                      }}
                      className='w-full p-2 bg-white/10 rounded'
                    />

                    <input
                      type="time"
                      value={convertTo24Hour(cls.endTime)}
                      onChange={(e) => {
                        const updated = [...addData.classes]
                        updated[index].endTime = convertTo12Hour(e.target.value)
                        setaddData({ ...addData, classes: updated })
                      }}
                      className='w-full p-2 bg-white/10 rounded'
                    />
                  </div>

                  {/* TYPE */}
                  <select
                    value={cls.type}
                    onChange={(e) => {
                      const updated = [...addData.classes]
                      updated[index].type = e.target.value
                      setaddData({ ...addData, classes: updated })
                    }}
                    className='w-full mt-2 p-2 bg-white/10 rounded border border-white/30'
                  >
                    <option className='text-black' value="">Select Type</option>
                    <option className='text-black' value="Theory">Theory</option>
                    <option className='text-black' value="Lab">Lab</option>
                  </select>

                  {/* REMOVE BUTTON */}
                  {addData.classes.length > 1 && (
                    <button
                      onClick={() => {
                        const updated = addData.classes.filter((_, i) => i !== index)
                        setaddData({ ...addData, classes: updated })
                      }}
                      className='mt-2 text-red-400 text-sm'
                    >
                      Remove Class
                    </button>
                  )}
                </div>
              ))}

              {/* ➕ ADD MORE CLASS */}
              <button
                onClick={() => {
                  setaddData({
                    ...addData,
                    classes: [
                      ...addData.classes,
                      {
                        subject: "",
                        teacher: "",
                        type: "",
                        startTime: "10:00 AM",
                        endTime: "11:00 AM",
                      },
                    ],
                  })
                }}
                className='w-full mb-3 bg-blue-500/20 border border-blue-400/40 text-blue-300 py-2 rounded-xl'
              >
                + Add More Class
              </button>

              {/* ACTION BUTTONS */}
              <div className='flex gap-3'>
                <button
                  onClick={() => setShowAddForm(false)}
                  className='w-full bg-red-500/20 border border-red-400/40 text-red-300 py-2 rounded-xl'
                >
                  Cancel
                </button>

                <button
                  onClick={addClass}
                  disabled={adding}
                  className='w-full bg-green-500/20 border border-green-400/40 text-green-300 py-2 rounded-xl'
                >
                  {adding ? "Adding..." : "Add"}
                </button>
              </div>

            </div>
          </div>
        )}

        {showForm && editData && (
          <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-3'>

            <div className='bg-black/80 border border-white/40 p-5 lg:p-8 rounded-2xl w-full max-w-[600px]'>

              <h2 className='text-2xl mb-3'>Edit Day</h2>

              {updateError && (
                <p className="text-red-500 mb-3">{updateError}</p>
              )}

              <select
                value={editData.day}
                onChange={(e) => setEditData({ ...editData, day: e.target.value })}
                className='w-full mb-3 p-3 bg-white/10 rounded-xl border border-white/30'
              >
                <option className='text-black' value="Monday">Monday</option>
                <option className='text-black' value="Tuesday">Tuesday</option>
                <option className='text-black' value="Wednesday">Wednesday</option>
                <option className='text-black' value="Thursday">Thursday</option>
                <option className='text-black' value="Friday">Friday</option>
                <option className='text-black' value="Saturday">Saturday</option>
              </select>

              {editData.classes.map((cls, index) => (
                <div key={index} className='mb-4 border border-white/30 p-3 rounded-xl'>

                  <select
                    value={cls.subject}
                    onChange={(e) => {
                      const updated = [...editData.classes]
                      updated[index].subject = e.target.value
                      setEditData({ ...editData, classes: updated })
                    }}
                    className='w-full mb-2 p-2 bg-white/10 rounded border border-white/30'
                  >
                    <option className='text-black' value="">Select Subject</option>
                    <option className='text-black' value="DBMS">DBMS</option>
                    <option className='text-black' value="Operating System">OS</option>
                    <option className='text-black' value="Computer Network">Computer Network</option>
                    <option className='text-black' value="java">java</option>
                    <option className='text-black' value="Software Engineering">Software Engineering</option>
                  </select>

                  <select
                    value={cls.teacher}
                    onChange={(e) => {
                      const updated = [...editData.classes]
                      updated[index].teacher = e.target.value
                      setEditData({ ...editData, classes: updated })
                    }}
                    className='w-full mb-2 p-2 bg-white/10 rounded border border-white/30'
                  >
                   <option className='text-black' value="">Select Teacher</option>
                    <option className='text-black' value="PGR">PGR</option>
                    <option className='text-black' value="TKP">TKP</option>
                    <option className='text-black' value="ND">ND</option>
                    <option className='text-black' value="AT">AT</option>
                  </select>

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

              <div className='flex gap-3'>
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
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default WeeklyClassAdmin