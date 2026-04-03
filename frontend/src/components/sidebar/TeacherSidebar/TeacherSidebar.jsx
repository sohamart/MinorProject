import React from 'react'
import TeacherSidebarItems from './TeacherSidebarItems'
import TeacherSidebarMob from './TeacherSidebarMob'

const TeacherSidebar = () => {
  return (
     <>
    <div className="lg:w-110 h-full  w-screen hidden backdrop-blur-2xl bg-black/10 border border-white/50 rounded-2xl lg:block">
            <TeacherSidebarItems></TeacherSidebarItems>
          


        </div>

        {/* Mobile Navbar */}
        <div className="block lg:hidden">
          <TeacherSidebarMob />
        </div>
    </>
  )
}

export default TeacherSidebar
