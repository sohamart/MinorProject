"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StudentSidebarItems from "./studentSidebarItems";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const SidebarMob = () => {
  const [navopen, setnavopen] = useState(false);
  const [showCross, setShowCross] = useState(false);

  // 👉 OPEN
  const openNav = () => {
    setnavopen(true);
    setTimeout(() => {
      setShowCross(true); // delay diye cross ashbe
    }, 300);
  };

  // 👉 CLOSE (sequence)
  const closeNav = () => {
    setShowCross(false); // age cross hide
    setTimeout(() => {
      setnavopen(false); // tarpor sidebar close
    }, 300);
  };

  return (
    <div className="relative">

      {/* Menu Button */}
      <motion.div
        initial={false}
        animate={{ x: navopen ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-10 bg-white/15 border-r-2 border-white/30 rounded-r-2xl absolute top-4 left-[-2px] flex justify-center items-center h-10 z-40"
      >
        <button onClick={openNav} className="mr-1 cursor-pointer">
          <Menu color="#ffffff" />
        </button>
      </motion.div>

      {/* Sidebar */}
      <AnimatePresence>
        {navopen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="p-12 fixed top-0 left-0 h-screen w-screen backdrop-blur-xl bg-black/50 z-40"
          >

            {/* 🔥 Cross Button (Animated) */}
            <AnimatePresence>
              {showCross && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 bg-white/25 border-l-2 border-white/30 rounded-l-2xl absolute top-8 right-0 flex justify-center items-center h-10"
                >
                  <button onClick={closeNav} className="mr-1 cursor-pointer">
                    <X color="#ffffff" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="text-white w-full h-4/5 mt-12 space-y-9"
            >
              <StudentSidebarItems NavHandel={closeNav} />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SidebarMob;