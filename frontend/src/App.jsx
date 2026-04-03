import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Student from './pages/student/student'
import HomeStudent from './pages/student/HomeStudent'
import Login from './pages/login/Login'
import HomeTeacher from './pages/Teacher/HomeTeacher'
import Teacher from './pages/Teacher/Teacher'
import HomeAdmin from './pages/Admin/HomeAdmin'
import Admin from './pages/Admin/Admin'
import Home from './pages/home/Home'
import Faculty from './pages/student/Faculty'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import Profile from './pages/student/Profile'

import { motion, useMotionValue, useSpring } from 'framer-motion'



const App = () => {
  return (
    <div className='h-screen relative w-screen flex flex-col  overflow-hidden bg-black'>
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
          className="absolute hidden lg:block w-[450px] h-[450px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
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
          className="absolute hidden lg-block top-1/2 left-1/2 lg:top-2/5 lg:left-3/5 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"
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
          className="absolute hidden lg:block left-200 top-100 w-[450px] h-[450px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
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
          className="absolute hidden left-200 top-100 lg:block w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"
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
          className="absolute hidden lg-block  lg:bottom-2/5 lg:left-3/5 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"
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

        
        

        {/* mobile blob */}

        
        <div className="absolute lg:hidden top-50  lg:top-1/2 lg:left-1/2 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          >

        </div>
        <div className="absolute top-[-200px] lg:hidden w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          >

        </div>
    

    <Routes>
      {/* login */}
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<ErrorPage/>}/>

      
      
      {/* student route */}
      <Route path="/student" element={<Student/>}>
        <Route path='/student/home' element={<HomeStudent/>}/>
        <Route path='/student/Faculty' element={<Faculty/>}/>
        <Route path='/student/profile/:id' element={<Profile/>}/>
      </Route>

      {/* teacher route */}
      <Route path="/teacher" element={<Teacher/>}>
      <Route path='/teacher/home' element={<HomeTeacher/>}/>
      </Route>
      <Route path="/admin" element={<Admin/>}>
      <Route path='/admin/home' element={<HomeAdmin/>}/>
      </Route>


    </Routes>


    </div>
  )
}

export default App
