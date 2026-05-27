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
  const isMedianApp =
    navigator.userAgent.includes("C.R");

  return (
    <div className="text-white pb-12 relative z-20 flex gap-4 no-scrollbar overflow-y-auto flex-col w-full items-center h-full rounded-2xl p-2 lg:pt-18">
      
      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
           className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 
  justify-center items-center rounded-2xl

  border backdrop-blur-xl
  transition-all duration-300

  ${isActive
              ? "bg-white/15 border-yellow-400/70 shadow-lg shadow-yellow-400/10"
              : "bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10"
            }

  text-white hover:scale-[1.02]
  `
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
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 
  justify-center items-center rounded-2xl

  border backdrop-blur-xl
  transition-all duration-300

  ${isActive
              ? "bg-white/15 border-yellow-400/70 shadow-lg shadow-yellow-400/10"
              : "bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10"
            }

  text-white hover:scale-[1.02]
  `
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
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 
  justify-center items-center rounded-2xl

  border backdrop-blur-xl
  transition-all duration-300

  ${isActive
              ? "bg-white/15 border-yellow-400/70 shadow-lg shadow-yellow-400/10"
              : "bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10"
            }

  text-white hover:scale-[1.02]
  `
          }
          to={"/student/todayClasses"}
        >
          Today Classes
        </NavLink>
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 
  justify-center items-center rounded-2xl

  border backdrop-blur-xl
  transition-all duration-300

  ${isActive
              ? "bg-white/15 border-yellow-400/70 shadow-lg shadow-yellow-400/10"
              : "bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10"
            }

  text-white hover:scale-[1.02]
  `
          }
          to={"/student/ExtraClasses"}
        >
          Extra Class
        </NavLink>
      </motion.div>
      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 
  justify-center items-center rounded-2xl

  border backdrop-blur-xl
  transition-all duration-300

  ${isActive
              ? "bg-white/15 border-yellow-400/70 shadow-lg shadow-yellow-400/10"
              : "bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10"
            }

  text-white hover:scale-[1.02]
  `
          }
          to={"/student/WeeklyClasses"}
        >
          Weekly Classes
        </NavLink>
      </motion.div>
      

      <motion.div variants={itemVariants}>
        <NavLink
          onClick={props.NavHandel}
          className={({ isActive }) =>
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 
  justify-center items-center rounded-2xl

  border backdrop-blur-xl
  transition-all duration-300

  ${isActive
              ? "bg-white/15 border-yellow-400/70 shadow-lg shadow-yellow-400/10"
              : "bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10"
            }

  text-white hover:scale-[1.02]
  `
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
            `flex w-78 h-15 lg:w-45 mr-2 lg:h-10 
  justify-center items-center rounded-2xl

  border backdrop-blur-xl
  transition-all duration-300

  ${isActive
              ? "bg-white/15 border-yellow-400/70 shadow-lg shadow-yellow-400/10"
              : "bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10"
            }

  text-white hover:scale-[1.02]
  `
          }
          to={`/student/profile/${loggedinStudent?._id}`}
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
          to={`/privacy_policy`}
        >
          Privecy Policy
        </NavLink>
      </motion.div>
      <motion.div
              variants={itemVariants}
              className="w-full flex justify-center"
            >
              {
                isMedianApp ? (
      
                  // ✅ Installed / Greeting Card
                  <div
                    className="
              group relative overflow-hidden
      
             w-78 lg:w-full
              h-[120px] lg:h-[140px]
      
              mr-2 ml-2 px-4 py-3
      
              rounded-3xl
      
              flex justify-center  flex-col
      
              border border-green-400/20
              bg-gradient-to-br from-green-400/10 to-white/5
              backdrop-blur-2xl
      
              shadow-xl shadow-green-400/10
              "
                  >
      
                    {/* Glow */}
                    <div className="
                absolute inset-0
                bg-gradient-to-br
                from-green-400/20 via-transparent to-transparent
              " />
      
                    <div className="relative flex items-start gap-3">
      
                      {/* Icon */}
                      <div
                        className="
                  min-w-[42px] h-[42px]
      
                  rounded-2xl
                  bg-green-400
      
                  flex items-center justify-center
      
                  shadow-lg shadow-green-400/30
                  "
                      >
                        ❤️
                      </div>
      
                      {/* Text */}
                      <div className="flex flex-col overflow-hidden">
      
                        <h1 className="text-white text-[14px] font-semibold leading-tight">
                          Thanks For Installing
                        </h1>
      
                        <p className="text-green-200 text-[11px] mt-1 leading-relaxed">
                          Enjoy smoother & faster app experience 🚀
                        </p>
      
                      </div>
      
                    </div>
      
                    {/* Bottom */}
                    <div className="relative flex items-center justify-between mt-3">
      
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
      
                        <span className="text-[10px] text-green-200">
                          APK Installed
                        </span>
                      </div>
      
                      <div
                        className="
                  px-2 py-1 rounded-full
      
                  bg-white/10
                  border border-white/10
      
                  text-[10px] text-white
                  "
                      >
                        THANK YOU
                      </div>
      
                    </div>
      
                  </div>
      
                ) : (
      
                  // ✅ Download Card
                  <a
                    href="https://sohamart.github.io/C.R-Time-Pro/"
                    target="_blank"
                    rel="noreferrer"
                    className="
              group relative overflow-hidden
      
              w-78 lg:w-full
              h-[150px] lg:h-[150px]
      
              mr-2 ml-2 px-4 py-3
      
              rounded-3xl
      
              flex justify-center  flex-col
      
              border border-white/10
              bg-gradient-to-br from-yellow-400/10 to-white/5
              backdrop-blur-2xl
      
              transition-all duration-300
      
              hover:border-yellow-400/50
              hover:bg-white/10
              hover:shadow-2xl hover:shadow-yellow-400/10
              hover:scale-[1.02]
              "
                  >
      
                    {/* Glow */}
                    <div className="
                absolute inset-0
                bg-gradient-to-br
                from-yellow-400/20 via-transparent to-transparent
                opacity-0 group-hover:opacity-100
                transition-all duration-500
              " />
      
                    <div className="relative flex items-start gap-3">
      
                      {/* Icon */}
                      <div
                        className="
                  min-w-[42px] h-[42px]
      
                  rounded-2xl
                  bg-yellow-400
      
                  flex items-center justify-center
      
                  shadow-lg shadow-yellow-400/30
                  "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16"
                          />
                        </svg>
                      </div>
      
                      {/* Text */}
                      <div className="flex flex-col overflow-hidden">
      
                        <h1 className="text-white text-[14px] font-semibold leading-tight">
                          Download Android App
                        </h1>
      
                        <p className="text-gray-300 text-[11px] mt-1 leading-relaxed">
                          Faster performance & premium experience.
                        </p>
      
                      </div>
      
                    </div>
      
                    {/* Bottom */}
                    <div className="relative flex items-center justify-between mt-3">
      
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      
                        <span className="text-[10px] text-green-300">
                          Latest Version
                        </span>
                      </div>
      
                      <div
                        className="
                  px-2 py-1 rounded-full
      
                  bg-yellow-400/15
                  border border-yellow-400/20
      
                  text-[10px] text-yellow-300
                  "
                      >
                        APK
                      </div>
      
                    </div>
                    <button
                      className="
                                px-3 py-1.5 rounded-xl
      
                                bg-yellow-400
                                hover:bg-yellow-300
      
                                text-black text-[11px] font-semibold
      
                                transition-all duration-300
                                hover:scale-105
      
                                shadow-lg mt-2 mb-2 shadow-yellow-400/20
                                " 
                    >
                      Download
                    </button>
      
                  </a>
      
                )
              }
            </motion.div>

    </div>
  );
};

export default studentSidebarItems;