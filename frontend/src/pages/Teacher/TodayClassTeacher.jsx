import React, { useContext, useState } from 'react'
import { ClassContextData } from '../../context/ClassContext'
import axios from 'axios'

const TodayClassTeacher = () => {
  const { classes = [], API, setrefresh } = useContext(ClassContextData) || {}

  const [editData, seteditData] = useState(null)
  const [loadingId, setloadingId] = useState(null)
  const [saving, setsaving] = useState(false)

  // DELETE
  const handleDelete = async (id) => {
    try {
      setloadingId(id)

      await axios.delete(`${API}/api/class/today/delete/${id}`, {
        withCredentials: true
      })

      setrefresh(prev => !prev)
    } catch (err) {
      console.log(err)
    } finally {
      setloadingId(null)
    }
  }

  // OPEN EDIT
  const openEdit = (cls) => {
    seteditData({ ...cls })
  }

  // SUBMIT EDIT
  const handleEditSubmit = async () => {
    try {
      if (!editData.time.includes("-")) {
        alert("Time format must be 10:00-11:00")
        return
      }

      setsaving(true)

      await axios.put(
        `${API}/api/class/today/update/${editData._id}`,
        editData,
        { withCredentials: true }
      )

      seteditData(null)
      setrefresh(prev => !prev)

    } catch (err) {
      console.log(err)
    } finally {
      setsaving(false)
    }
  }

  return (
    <>
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />

      {/* MAIN UI */}
      <div className='relative text-white h-full w-full bg-black/10 flex flex-col items-center border border-white/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl'>
        
        <div className='lg:w-120 h-18 w-50 lg:h-20 bg-white/10 border border-white/20 shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
          <h1 className='lg:text-3xl uppercase font-bold tracking-wide'>Today Classes</h1>
        </div>

        <div className='h-full pt-10 w-full overflow-auto pb-20'>
          
          <div className='p-4 flex flex-col lg:flex-row justify-center items-center lg:flex-wrap gap-5'>
            
            {classes.length === 0 ? (
              <p className='text-center text-gray-300 animate-pulse'>No classes today</p>
            ) : (
              classes.map((cls) => (
                <div 
                  key={cls._id}
                  className='w-full lg:h-36 lg:w-120 bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col justify-between backdrop-blur-lg hover:bg-white/15 transition duration-300'
                >
                  
                  {/* TOP */}
                  <div className='flex justify-between items-center'>
                    <div>
                      <h2 className='font-bold text-lg'>{cls.subject}</h2>
                      <p className='text-sm mt-1 text-gray-300'>{cls.teacher}</p>
                      <p className='text-xs mt-1 text-green-400 font-medium'>{cls.time}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${cls.type === "lab" 
                        ? "bg-green-500/20 border border-green-500/50" 
                        : "bg-blue-500/20 border border-blue-500/50"}`}>
                      {cls.type}
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className='flex gap-3 mt-3'>
                    
                    <button
                      onClick={() => openEdit(cls)}
                      className='flex-1 py-1 text-sm rounded bg-yellow-500/20 border border-yellow-500/40 active:scale-95 transition'
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(cls._id)}
                      disabled={loadingId === cls._id}
                      className='flex-1 py-1 text-sm rounded bg-red-500/20 border border-red-500/40 flex justify-center items-center gap-2'
                    >
                      {loadingId === cls._id ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : "Delete"}
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/50'>
          
          <div className='bg-white/10 border border-white/20 p-6 rounded-xl w-[90%] max-w-md shadow-2xl backdrop-blur-xl'>
            
            <h2 className='text-xl font-bold mb-4 text-center'>Edit Class</h2>

            <input
              className='w-full mb-2 p-2 rounded bg-white/10 border border-white/30'
              value={editData.subject}
              onChange={(e) => seteditData({ ...editData, subject: e.target.value })}
              placeholder="Subject"
            />

            <input
              className='w-full mb-2 p-2 rounded bg-white/10 border border-white/30'
              value={editData.teacher}
              onChange={(e) => seteditData({ ...editData, teacher: e.target.value })}
              placeholder="Teacher"
            />

            <input
              type="text"
              placeholder="10:00-11:00"
              className='w-full mb-2 p-2 rounded bg-white/10 border border-white/30'
              value={editData.time || ""}
              onChange={(e) => {
                let value = e.target.value.replace(/\s/g, "")
                if (value.length === 5 && !value.includes("-")) {
                  value = value + "-"
                }
                seteditData({ ...editData, time: value })
              }}
            />

            <select
              className='w-full mb-4 p-2 rounded bg-white/10 border border-white/30'
              value={editData.type}
              onChange={(e) => seteditData({ ...editData, type: e.target.value })}
            >
              <option value="theory">Theory</option>
              <option value="lab">Lab</option>
            </select>

            <div className='flex gap-3'>
              
              <button
                onClick={handleEditSubmit}
                disabled={saving}
                className='flex-1 py-2 bg-green-500/20 border border-green-500/40 rounded flex justify-center items-center'
              >
                {saving ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : "Save"}
              </button>

              <button
                onClick={() => seteditData(null)}
                className='flex-1 py-2 bg-red-500/20 border border-red-500/40 rounded'
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

export default TodayClassTeacher