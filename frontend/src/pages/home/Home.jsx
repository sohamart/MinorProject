import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContextData } from '../../context/AuthContext'
import Loading from '../../components/loading/loading'

const Home = () => {
    const navigate = useNavigate()
    const{loading} = useContext(AuthContextData)

    const loginhandel = () => {
        navigate("/login")
    }
    if(loading){
        return <Loading></Loading>
    }
  return (
    <div className='flex flex-col justify-center  items-center w-screen h-screen bg-amber-200-'>
        <h1 className='text-4xl lg:text-8xl md:text-6xl uppercase font-bold'>Home Page</h1>
        <button className='w-35 h-12 rounded-2xl mt-8 text-2xl font-bold active:scale-95 duration-300 bg-green-400' onClick={loginhandel}>Login</button>
    </div>
  )
}

export default Home
