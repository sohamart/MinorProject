import React from 'react'
import SidebarMob from './SidebarMob'
import StudentSidebarItems from './studentSidebarItems'

const sidebar = () => {
  return (
    <>
    <div className="lg:w-110 h-full w-screen hidden bg-black/10 border border-white/50 rounded-2xl lg:block">
            <StudentSidebarItems></StudentSidebarItems>
          


        </div>

        {/* Mobile Navbar */}
        <div className="block lg:hidden">
          <SidebarMob />
        </div>
    </>
  )
}

export default sidebar
