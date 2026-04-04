import React, { useEffect, useState } from 'react'
import axios from 'axios'

const WeeklyClassAdmin = () => {

  const [weekly, setweekly] = useState([])
  const [loadingId, setloadingId] = useState(null)
  const [adding, setadding] = useState(false)
  const [openForm, setopenForm] = useState(false)

  const [form, setform] = useState({
    day: "",
    classes: [
      { subject: "", teacher: "", time: "", type: "theory" }
    ]
  })

  const API = import.meta.env.VITE_API_URI

  const fetchWeekly = async () => {
    try {
      const res = await axios.get(`${API}/api/class/weekly`, {
        withCredentials: true
      })
      setweekly(res.data.weeklyclass || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWeekly()
  }, [])

  const handleDeleteDay = async (day) => {
    try {
      setloadingId(day)

      await axios.delete(`${API}/api/class/weeklyclass/delete/${day}`, {
        withCredentials: true
      })

      setweekly(prev => prev.filter(d => d.day !== day))

    } catch (err) {
      console.log(err)
    } finally {
      setloadingId(null)
    }
  }

  const addSubject = () => {
    setform({
      ...form,
      classes: [
        ...form.classes,
        { subject: "", teacher: "", time: "", type: "theory" }
      ]
    })
  }

  const handleAdd = async () => {
    try {
      if (!form.day || form.classes.length === 0) {
        alert("All fields required")
        return
      }

      setadding(true)

      const res = await axios.post(
        `${API}/api/class/weeklyclass/add`,
        form,
        { withCredentials: true }
      )

      setweekly(prev => {
        const exist = prev.find(d => d.day.toLowerCase() === form.day.toLowerCase())

        if (exist) {
          return prev.map(d =>
            d.day.toLowerCase() === form.day.toLowerCase()
              ? { ...d, classes: [...d.classes, ...form.classes] }
              : d
          )
        }

        return [...prev, res.data.data]
      })

      setform({
        day: "",
        classes: [{ subject: "", teacher: "", time: "", type: "theory" }]
      })

      setopenForm(false)

    } catch (err) {
      console.log(err)
    } finally {
      setadding(false)
    }
  }

  return (
    <>
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />

      <div className='relative text-white h-full w-full bg-black/10 flex flex-col items-center border border-white/20 rounded-xl backdrop-blur-xl'>

        {/* HEADER */}
        <div className='w-full flex justify-between items-center p-4'>
          <h1 className='text-xl lg:text-3xl ml-12 lg:ml-2 font-bold'>Weekly Routine</h1>

          <button
            onClick={() => setopenForm(true)}
            className='px-4 py-2 bg-green-500/20 border border-green-500/40 rounded'
          >
            + Add
          </button>
        </div>

        {/* LIST */}
        <div className='w-full overflow-auto lg:flex-wrap items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-xl pt-22 pb-22 no-scrollbar [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] lg:justify-center p-4 flex lg:flex-row flex-col gap-5'>

          {weekly.map((dayData) => (
            <div key={dayData._id}
              className='bg-black/30 border w-full lg:w-120 border-white/20 rounded-xl p-4'>

              <div className='flex justify-between items-center mb-3'>
                <h2 className='font-bold text-purple-300'>{dayData.day}</h2>

                <button
                  onClick={() => handleDeleteDay(dayData.day)}
                  disabled={loadingId === dayData.day}
                  className='px-3 py-1 bg-red-500/20 border border-red-500/40 rounded flex items-center justify-center'
                >
                  {loadingId === dayData.day
                    ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    : "Delete"}
                </button>
              </div>

              {dayData.classes.map((cls, i) => (
                <div key={i}
                  className='flex justify-between items-center bg-white/10 p-3 rounded mb-2'>

                  <div>
                    <h3>{cls.subject}</h3>
                    <p className='text-xs text-gray-300'>{cls.teacher}</p>
                    <p className='text-xs text-green-400'>{cls.time}</p>
                  </div>

                  <span className={`px-2 py-1 text-xs rounded-full 
                    ${cls.type === "lab"
                      ? "bg-green-500/20 border border-green-500/50"
                      : "bg-blue-500/20 border border-blue-500/50"
                    }`}>
                    {cls.type}
                  </span>

                </div>
              ))}

            </div>
          ))}

          <div className='absolute bottom-[-12px] lg:bottom-[-14px] text-[6px] lg:text-[8px] text-white text-center opacity-10 flex justify-center items-center w-full'>
            <h1 className=' uppercase '>
              designed and devoloped by Soham Dutta
            </h1>
          </div>

        </div>

      </div>

      {/* MODAL */}
      {openForm && (
        <div className='fixed inset-0 z-50 flex  flex-col  items-center lg:justify-center backdrop-blur-lg bg-black/50 overflow-y-auto p-4'>
              <h2 className='text-xl lg:text-4xl uppercase mb-4 text-center'>Add Weekly Class</h2>
          <div className='bg-white/10 border border-white/20 p-6 rounded-xl w-[90%] max-w-md max-h-[70vh] no-scrollbar overflow-y-auto'>

            

            <input
              placeholder="Day"
              value={form.day}
              onChange={(e) => setform({ ...form, day: e.target.value })}
              className='w-full mb-2 p-2 rounded bg-white/10 border'
            />

            {form.classes.map((cls, i) => (
              <div key={i} className="mb-3">

                <input
                  placeholder="Subject"
                  value={cls.subject}
                  onChange={(e) => {
                    const updated = [...form.classes]
                    updated[i].subject = e.target.value
                    setform({ ...form, classes: updated })
                  }}
                  className='w-full mb-2 p-2 rounded bg-white/10 border'
                />

                <input
                  placeholder="Teacher"
                  value={cls.teacher}
                  onChange={(e) => {
                    const updated = [...form.classes]
                    updated[i].teacher = e.target.value
                    setform({ ...form, classes: updated })
                  }}
                  className='w-full mb-2 p-2 rounded bg-white/10 border'
                />

                <input
                  placeholder="10:00-11:00"
                  value={cls.time}
                  onChange={(e) => {
                    const updated = [...form.classes]
                    updated[i].time = e.target.value
                    setform({ ...form, classes: updated })
                  }}
                  className='w-full mb-2 p-2 rounded bg-white/10 border'
                />

                <select
                  value={cls.type}
                  onChange={(e) => {
                    const updated = [...form.classes]
                    updated[i].type = e.target.value
                    setform({ ...form, classes: updated })
                  }}
                  className='w-full mb-2 p-2 rounded bg-white/10 border'
                >
                  <option className='text-black' value="theory">Theory</option>
                  <option className='text-black' value="lab">Lab</option>
                </select>

              </div>
            ))}

            <button
              onClick={addSubject}
              className='mb-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded w-full'
            >
              + Add Subject
            </button>

            <div className='flex gap-3'>
              <button
                onClick={handleAdd}
                disabled={adding}
                className='flex-1 py-2 bg-green-500/20 border rounded flex justify-center'
              >
                {adding
                  ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  : "Add"}
              </button>

              <button
                onClick={() => setopenForm(false)}
                className='flex-1 py-2 bg-red-500/20 border rounded'
              >
                Cancel
              </button>
            </div>

          </div>

        </div>
      )}

    </>
  )
}

export default WeeklyClassAdmin