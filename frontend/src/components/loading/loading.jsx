import React, { useEffect, useState } from 'react'
import { ClockLoader } from 'react-spinners'

const Loading = () => {

  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {

    // 4 sec pore message show hobe
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => clearTimeout(timer)

  }, [])

  return (
    <div className='transform transition ease-in duration-300 flex-col h-screen w-screen flex bg-black items-center justify-center relative'>

      <h1 className='text-white text-xl lg:text-4xl md:text-4xl font-bold absolute top-2'>
        C.R TIME PRO
      </h1>

      <ClockLoader
        color="#ffffff"
        loading
        size={80}
      />

      {
        showMessage && (
          <p className='text-white mt-8 text-center px-4 text-sm lg:text-lg animate-pulse'>
            Please wait... First time may take some time because the server is starting now.
          </p>
        )
      }

    </div>
  )
}

export default Loading