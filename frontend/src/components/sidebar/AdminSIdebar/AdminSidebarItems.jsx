"use client"
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { useContext } from "react";
import { AuthContextData } from "../../../context/AuthContext";

import { useRef } from "react";




const AdminSidebarItems = (props) => {
 const navRef = useRef(null);
      const { loggedinAdmin } = useContext(AuthContextData)
      

  const itemVariants = {
    hidden: { x: -60, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <div ref={navRef}  className="text-white pb-12 relative z-20 flex gap-4 no-scrollbar overflow-y-auto flex-col w-full items-center h-full rounded-2xl p-2 lg:pt-18">
      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/"}
        >
          Home
        </NavLink>
      </motion.div>

      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/Admin/home"}
        >
          Dashbord
        </NavLink>
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/Admin/todayClasses"}
        >
          TodayClass
        </NavLink>
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/Admin/WeeklyClass"}
        >
          Weekly Class
        </NavLink>
      </motion.div>

      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/Admin/facultiesData"}
        >
          Faculty
        </NavLink>
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/Admin/studentsData"}
        >
          Students
        </NavLink>
      </motion.div>

      <motion.div variants={itemVariants}>
        <NavLink
          
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={`/Admin/profile/${loggedinAdmin?._id}`}
        >
          Profile
        </NavLink>
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavLink
          
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/Admin/teacherRegister"}
        >
          Teacher Register
        </NavLink>
      </motion.div>
      <motion.div id="student-register" variants={itemVariants}>
        <NavLink
          
          onClick={props.NavHandel}
          
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 justify-center items-center rounded-2xl
            ${isActive 
              ? "bg-white/15 border border-amber-50" 
              : "hover:border hover:border-white/50 bg-none"}`
          }
          to={"/Admin/studentRegister"}
        >
          Student Register
        </NavLink>
      </motion.div>
      
      <div
      onClick={() => {
    navRef.current.scrollBy({
      top: 200, // কতটা scroll হবে
      behavior: "smooth"
    });
  }} className=" w-10 lg:hidden h-10 flex justify-center items-center bg:white/40 border border-white/50 fixed bottom-36 right-2 rounded-full ">
                      <ChevronDown className="text-white w-6 h-6"/>
        </div>

    </div>
  );
};

export default AdminSidebarItems;