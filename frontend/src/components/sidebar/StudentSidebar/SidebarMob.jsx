import React, { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import StudentSidebarItems from "./studentSidebarItems";



const SidebarMob = () => {
  const [navopen, setnavopen] = useState(false);

  const NavHandel = () => {
    setnavopen(!navopen);
  };
  return (
    <>
    <div className="relative">

   
      <div
        className={`w-10 bg-white/15 border-r-2 border-white/30  rounded-r-2xl absolute top-4 left[-2]  flex justify-center items-center h-10
    transform transition-transform duration-300 delay-400 ease-in z-40
      ${!navopen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button onClick={NavHandel} className=" mr-1 cursor-pointer">
          <Menu className="text-center" color="#ffffff" />
        </button>
      </div>

      <div
        className={` p-12 fixed top-0 left-0 h-screen w-screen  backdrop-blur-2xl 
        transform transition-transform duration-400 ease-in z-40
        ${navopen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="w-10 bg-white/25 border-l-2 border-white/30 rounded-l-2xl absolute top-8 right-0  flex justify-center items-center h-10">
          <button onClick={NavHandel} className=" mr-1 cursor-pointer">
            <X color="#ffffff" />
          </button>
        </div>
        <div className="navitem  text-white w-full h-4/5 mt-12  space-y-9 ">
          <StudentSidebarItems NavHandel={NavHandel}/>
        </div>
      </div>
     </div>
    </>
  );
};

export default SidebarMob;
