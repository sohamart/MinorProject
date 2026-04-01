import React from 'react'
import { NavLink } from 'react-router-dom'

const studentSidebarItems = (props) => {
    return (
        <div className='text-white flex gap-4 flex-col w-full items-center h-full rounded-2xl p-2 lg:pt-18 '>
            <NavLink 
            onClick={props.NavHandel}
            className={({ isActive }) =>
                `flex w-78 h-15 lg:w-45 mr-2 lg:h-10  justify-center items-center rounded-2xl
                ${isActive ? "bg-white/15 border border-amber-50":"hover:border hover:border-white/50 bg-none"}`
            }
                to={'/student/home'}>Dashbord</NavLink>
            <NavLink 
            onClick={props.NavHandel}
            className={({ isActive }) =>
                `flex w-78 h-15 lg:w-45 mr-2 lg:h-10  justify-center items-center rounded-2xl
                ${isActive ? "bg-white/15 border border-amber-50":"hover:border hover:border-white/50 bg-none"}`
           } to={'/student/Faculty'}>Faculty</NavLink>
         </div>
    )
}

export default studentSidebarItems
