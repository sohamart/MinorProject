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
        className="relative flex w-screen h-screen  overflow-hidden text-white bg-black">


        {/* Gradient Mesh Blobs */}
        <motion.div
          className="absolute  top-1/2 left-1/2 lg:block w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute hidden lg:block w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 80, -60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute  lg:block w-[450px] h-[450px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -60, 100, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        <motion.div
          className="absolute top-1/2 left-1/2 lg:top-2/5 lg:left-3/5 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute hidden  lg:block lg:top-1/2 lg:left-1/2 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 80, -60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/5 left-1/4 lg:top-1/2 lg:left-1/2 w-[450px] h-[450px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -60, 100, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Overlay Gradient (depth) */}
        {/* <div className="absolute  inset-0 top:1/2 left:1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-black via-transparent to-black opacity-90"></div> */}



        {/* 🧊 Main Content */}
        <div className="relative z-10 lg:gap-4 fixed top-0 p-4 flex w-full">

          <Sidebar />
          <div className=' lg:h-full md:h-full w-full h-[83vh]'>
              <Outlet context={{ loggedinName: loggedinStudent?.name }} />
          </div>
        

        </div>

      </div>
      <div className="lg:hidden  w-full h-[13vh]  md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-5">
        <div className="backdrop-blur-2xl h-full   border-t-2 border-white rounded-4xl px-4 py-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Dock />
        </div>
      </div>
    </>
  )

}

export default Student