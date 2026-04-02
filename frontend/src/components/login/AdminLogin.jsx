import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContextData } from '../../context/AuthContext'
import { Circle, CircleCheck } from 'lucide-react'

const AdminLogin = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const Navigate = useNavigate()
    const [userNotFound, setuserNotFound] = useState("")
    const { setloggedinAdmin, loggedinName, setloggedinName, API } = useContext(AuthContextData)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false) // 🔥 NEW

    const formhandel = async (e) => {
        e.preventDefault()
        setLoading(true) // 🔥 start

        try {
            const response = await axios.post(
                `${API}/api/auth/admin/login`,
                { email, password },
                { withCredentials: true }
            )

            setloggedinAdmin(response.data.adminuserdata)
            setloggedinName(response.data.adminuserdata.name)

            Navigate("/admin/")

        } catch (error) {
            console.log(error.response?.data?.message)
            setuserNotFound(error.response?.data?.message)
        } finally {
            setLoading(false) // 🔥 stop
        }

        setemail("")
        setpassword("")
    }

    return (
        <>
            <form
                            onSubmit={formhandel}
                            className={` backdrop-blur-2xl  border border-red-400/50 bg-red-400/15 relative lg:w-100 lg:p-5 w-80 md:w-180 p-5 md:p-15 rounded-2xl shadow-lg flex flex-col items-center justify-center`}>
            
                            <h1 className='absolute md:top-13 lg:top-6 top-5 text-2xl lg:text-2xl uppercase font-bold md:text-5xl'>Admin Login</h1>
            
                            {userNotFound && <h1 className='absolute md:top-25 lg:top-15 top-13 text-red-500'>{userNotFound}!!</h1>}
            
                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='Email'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10 mt-15 md:w-120 md:h-20 md:mt-20 lg:w-80 lg:h-13 lg:mt-18'
                                type="email"
                            />
            
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder='Password'
                                required
                                className='bg-white/10 border border-white/20 pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10 mt-5 md:w-120 md:h-20 md:mt-10 lg:w-80 lg:h-13 lg:mt-5'
                            />
            
                            <div className='flex gap-1 items-center justify-end mt-2 w-full mr-12'>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <CircleCheck className='w-5 mt-1' /> : <Circle className='w-5 mt-1' />}
                                </button>
                                <h1 className='text-sm'>show password</h1>
                            </div>
            
                            <button
                                disabled={loading} // 🔥 disable while loading
                                className='active:scale-95 duration-300 bg-black text-white rounded-2xl w-25 h-11 mt-5 md:text-2xl md:w-60 md:h-20 md:mt-10 lg:w-33 lg:h-14 uppercase border border-amber-50 lg:mt-5'
                            >
                                {loading ? <h1 className='text-sm md:text-xl lg:text-xl'>loading...</h1> : "Login"} {/* 🔥 text change */}
                            </button>
            
                        </form>
        </>
    )
}

export default AdminLogin