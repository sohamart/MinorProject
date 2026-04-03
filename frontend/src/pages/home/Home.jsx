import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContextData } from '../../context/AuthContext'
import Loading from '../../components/loading/loading'
import { motion } from "framer-motion"
import kalnaLogo from "../../assets/KALNA.png"
 
const Home = () => {
    const navigate = useNavigate()
    const{loading} = useContext(AuthContextData)
      const text = " ANLAK CINHCETYLOP"
    const loginhandel = () => {
        navigate("/login")
    }
    if(loading){
        return <Loading></Loading>
    }
  return (
    <>



        <div className='flex  relative flex-col items-center justify-center w-screen h-screen    overflow-hidden text-white '>
            <div className=' flex flex-col items-center pb-10 absolute top-0 h-[40vh] lg:h-[35vh] w-full rounded-b-[180px] lg:rounded-b-[100px] bg-indigo-400/10  backdrop-blur-2xl border-b-2 border-white/30'>
                    

        {/* Rotating Text Circle */}
        <div className="relative w-40 lg:h-60 h-80 flex items-center justify-center">

  {/* ✅ CENTER LOGO */}
  <img
    src={kalnaLogo}
    alt="Kalna Polytechnic"
    className="absolute w-30 h-30 object-contain"
  />

  {/* 🔄 ORBIT TEXT */}
  <motion.div
    animate={{ rotate: [0, 360] }}
    transition={{ repeat: Infinity, duration: 12, ease: "linear", repeatType: "loop" }}
    className="absolute w-full h-full will-change-transform"
    style={{ transform: "translateZ(0)" }}
  >
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="absolute left-1/2 top-1/2 text-white text-[15px]"
        style={{
          transform: `
            rotate(${i * (360 / text.length)}deg)
            translateY(-85px)
            rotate(90deg)
          `,
          transformOrigin: "0 0",
        }}
      >
        {char}
      </span>
    ))}
  </motion.div>

</div>
            </div>
            
            <h1 className='text-4xl lg:text-8xl md:text-6xl uppercase font-bold'>c.r time pro</h1>
            
        <div className=' flex flex-col items-center pb-10 absolute bottom-0 h-[40vh] lg:h-[35vh] w-full rounded-t-[180px] lg:rounded-t-[100px] bg-indigo-400/10 backdrop-blur-2xl border-t-2 border-white/30'>
                <button className='  z-2 w-35 h-12 rounded-2xl mt-8 text-2xl font-bold active:scale-95 duration-300 hover:bg-green-400 bg-green-400/30 border-2 border-green-400/40' onClick={loginhandel}>Login</button>
        

        </div>
        
        </div>

    
    
    
    </>
        
  )
}

export default Home
