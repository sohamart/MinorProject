import React from 'react'

import AdminSidebarMob from './AdminSidebarMob'

import AdminSidebarItems from './AdminSidebarItems'

const AdminSidebar = () => {
  return (
    <>
    <div className="lg:w-110 h-full  w-screen hidden backdrop-blur-2xl bg-black/10 border border-white/50 rounded-2xl lg:block">
            <AdminSidebarItems></AdminSidebarItems>
          


        </div>

        {/* Mobile Navbar */}
        <div className="block lg:hidden">
          <AdminSidebarMob />
        </div>
    </>
  )
}

export default AdminSidebar
