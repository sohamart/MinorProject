import React, { useState, useEffect } from 'react'
import { ClockLoader } from 'react-spinners'
import { motion } from 'framer-motion'

const Loading = () => {
  const [showMessage, setShowMessage] = useState(false)

  // ✅ Detect Median App
  const isMedianApp =
    navigator.userAgent.includes("C.R")

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  // 🚀 Mobile App Loading
  if (isMedianApp) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">

        {/* Background Glow */}
        <div className="absolute w-72 h-72 bg-yellow-500/20 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Animated Logo */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center"
          >
            <span className="text-3xl font-bold text-white">
              CR
            </span>
          </motion.div>

          {/* App Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-3xl font-bold mt-6"
          >
            C.R TIME PRO
          </motion.h1>

          <p className="text-gray-400 mt-2 text-sm">
            Mobile Experience
          </p>

          {/* Loading Dots */}
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {showMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 mt-8 text-center px-8"
            >
              Preparing your workspace...
            </motion.p>
          )}
        </motion.div>
      </div>
    )
  }

  // 💻 Desktop Loading
  return (
    <div className='flex flex-col h-screen w-screen bg-black/15 backdrop-blur-2xl items-center justify-center'>
      <h1 className='text-white text-xl lg:text-4xl font-bold absolute top-5'>
        C.R TIME PRO
      </h1>

      <ClockLoader
        color="#ffffff"
        loading
        size={80}
      />

      {showMessage && (
        <p className='absolute bottom-10 text-green-500 animate-pulse text-center px-4'>
          Please wait... First time may take some time because the server is starting now.
        </p>
      )}
    </div>
  )
}

export default Loading