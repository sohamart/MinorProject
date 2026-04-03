import React from 'react'
import { Outlet } from 'react-router'
import { useContext } from 'react'
import Loading from '../../components/loading/loading'

import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContextData } from '../../context/AuthContext'

import Dock from '../../components/dockMobile/dock'
import AdminSidebar from '../../components/sidebar/AdminSIdebar/AdminSidebar'



const Admin = () => {
 const navigate = useNavigate()
  const { loggedinAdmin, loading } = useContext(AuthContextData)

  useEffect(() => {
    if (!loading && !loggedinAdmin) {
      navigate("/login")
    }
  }, [loggedinAdmin, loading])

  // ⛔ Wait until auth check complete
  if (loading) return <Loading />

  // ⛔ Stop rendering to avoid flicker
  if (!loggedinAdmin) return null

  return (
    <>
    <div
        
        className="relative no-scrollbar flex w-screen h-screen  overflow-hidden text-white ">


       


        {/* 🧊 Main Content */}
        <div className=" relative z-10 lg:gap-4  top-0 p-4 flex w-full">

          <AdminSidebar />
          <div className=' lg:h-full md:h-full w-full h-[83vh]'>
              <Outlet context={{ loggedinName: loggedinAdmin?.name }} />
          </div>
          

        </div>

      </div>
      <div className="lg:hidden  w-full h-[13vh]   md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-15">
        <div className="backdrop-blur-2xl h-full z-20  border-t-2 border-white rounded-4xl px-4 py-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Dock loggedinAdmin={loggedinAdmin} />
        </div>
        
        
      </div>
    </>
  )
}

export default Admin
