import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import { AuthContextData } from '../../context/AuthContext'
import Sidebar from '../../components/sidebar/StudentSidebar/sidebar'
import {motion , useMotionValue, useSpring} from 'framer-motion'
import { useDragControls } from "motion/react"



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
    <div
    onMouseMove={handleMouseMove}
    className="relative flex w-screen h-screen  overflow-hidden text-white bg-black">
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute  w-10 h-10 bg-white/12 border border-white/20  rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          x: 150,
          y: 0,
          rotate: 360,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "ease",
          

        }}
        className="absolute top-150 left-20 lg:top-120 lg:left-320 lg:w-200 lg:h-200 h-60 w-60 bg-blue-500 opacity-80 blur-3xl rounded-full pointer-events-none"
      />
      
      
      <motion.div
        animate={{
          x: 350,
          y: 0,
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "ease",
          

        }}
        className="absolute hidden lg:block bottom-0 right-0 lg:bottom-[-720px] lg:right-320  lg:w-200 lg:h-200 h-60 w-60 bg-green-500 opacity-80 blur-3xl rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          x: 550,
          y: 0,
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "ease",
          

        }}
        className="absolute hidden lg:block bottom-0 right-0 lg:top-[-720px] lg:right-[250px]  lg:w-200 lg:h-200 h-60 w-60 bg-green-500 opacity-80 blur-3xl rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          x: 550,
          y: 0,
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "ease",
          

        }}
        className="absolute bottom-150 right-120 lg:top-[-700px] lg:right-320  lg:w-200 lg:h-200 h-60 w-60 bg-purple-500 opacity-80 blur-3xl rounded-full pointer-events-none"
      />

      

      {/* 🧊 Main Content */}
      <div className="relative z-10 lg:gap-4 p-4 flex w-full">

        <Sidebar />
        <Outlet context={{ loggedinName: loggedinStudent?.name }} />
      </div>
    </div>
      )
}

      export default Student