"use client"
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { useContext } from "react";
import { AuthContextData } from "../../../context/AuthContext";


const studentSidebarItems = (props) => {
  
      const { loggedinStudent } = useContext(AuthContextData)
      

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
    <div className="text-white z-20 flex gap-4  flex-col w-full items-center h-full rounded-2xl p-2 lg:pt-18">
      
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
          to={"/student/home"}
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
          to={"/student/todayClasses"}
        >
          TodayClasses
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
          to={"/student/Faculty"}
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
          to={`/student/profile/${loggedinStudent?._id}`}
        >
          Profile
        </NavLink>
      </motion.div>

    </div>
  );
};

export default studentSidebarItems;