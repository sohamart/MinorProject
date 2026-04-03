import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import { AuthContextData } from '../../context/AuthContext'
import Sidebar from '../../components/sidebar/StudentSidebar/sidebar'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useDragControls } from "motion/react"
import Dock from '../../components/dockMobile/dock'



const Student = () => {
  const controls = useDragControls()
  const navigate = useNavigate()
  const { loggedinStudent, loading } = useContext(AuthContextData)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth effect
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.top) // center adjust
    mouseY.set(e.clientY - rect.left)
  }


  useEffect(() => {
    if (!loading && !loggedinStudent) {
      navigate("/login")
    }
  }, [loggedinStudent, loading])

  // ⛔ Wait until auth check complete
  if (loading) return <Loading />

  // ⛔ Stop rendering to avoid flicker
  if (!loggedinStudent) return null

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        className="relative flex w-screen h-screen  overflow-hidden text-white ">


       


        {/* 🧊 Main Content */}
        <div className="relative z-10 lg:gap-4 fixed top-0 p-4 flex w-full">

          <Sidebar />
          <div className=' lg:h-full md:h-full w-full h-[83vh]'>
              <Outlet context={{ loggedinName: loggedinStudent?.name }} />
          </div>
          

        </div>

      </div>
      <div className="lg:hidden  w-full h-[13vh]   md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-15">
        <div className="backdrop-blur-2xl h-full z-20  border-t-2 border-white rounded-4xl px-4 py-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Dock loggedinStudent={loggedinStudent} />
        </div>
        
        
      </div>
    </>
  )

}

export default Student