import React, { useState, useEffect } from 'react'
import { ClockLoader } from 'react-spinners'
import { motion, AnimatePresence } from 'framer-motion'

const Loading = () => {
  const messages = [
    "Initializing application...",
    "Loading resources...",
    "Preparing your workspace...",
    "Connecting to services...",
    "Syncing data...",
    "Almost ready...",
    "This is taking longer than expected...",
    "Checking network connection...",
    "Unable to complete loading.",
    "Please retry."
  ]

  const [messageIndex, setMessageIndex] = useState(0)

  // ✅ Detect Median App
  const isMedianApp = navigator.userAgent.includes("C.R")

  useEffect(() => {
    const timings = [
      2000,
      4000,
      6000,
      8000,
      10000,
      12000,
      15000,
      18000,
      22000,
      25000
    ]

    const timers = timings.map((time, index) =>
      setTimeout(() => {
        setMessageIndex(index)
      }, time)
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  const MessageComponent = () => (
    <AnimatePresence mode="wait">
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        className={`mt-8 text-center px-8 ${
          messageIndex >= 8
            ? "text-red-400"
            : messageIndex >= 6
            ? "text-yellow-400"
            : "text-green-400"
        }`}
      >
        {messages[messageIndex]}
      </motion.p>
    </AnimatePresence>
  )

  // 🚀 Mobile App Loading
  if (isMedianApp) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
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
            <ClockLoader
              color="#ffffff"
              loading
              size={60}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-3xl font-bold mt-6"
          >
            C.R TIME PRO
          </motion.h1>

          <p className="text-gray-400 mt-2 text-sm">
            Mobile App Experience
          </p>

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

          <MessageComponent />
        </motion.div>
      </div>
    )
  }

  // 💻 Desktop Loading
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
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
          <ClockLoader
            color="#ffffff"
            loading
            size={60}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-3xl font-bold mt-6"
        >
          C.R TIME PRO
        </motion.h1>

        <p className="text-gray-400 mt-2 text-sm">
          Website Experience
        </p>

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

        <MessageComponent />
      </motion.div>
    </div>
  )
}

export default Loading