import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContextData } from '../../context/AuthContext'
import { Circle, CircleCheck } from 'lucide-react'
import { toast } from 'react-toastify'

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
         alert("Button Clicked");
         console.log("Button Clicked");
        try {
            const response = await axios.post(
                `${API}/api/auth/admin/login`,
                { email, password },
                { withCredentials: true }
            )

            setloggedinAdmin(response.data.adminuserdata)
            setloggedinName(response.data.adminuserdata.name)
            toast.success("Login Successful")


            Navigate("/admin/")

        } catch (error) {
            console.log(error.response?.data?.message)
            // setuserNotFound(error.response?.data?.message)
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false) // 🔥 stop
        }

        setemail("")
        setpassword("")
    }
    
const googleLogin = () => {

    const isMedian =
        navigator.userAgent.includes("C.R");

    if (isMedian) {

        window.open(
            `${API}/api/auth/google`,
            "_blank"
        );

        return;
    }

    window.location.href =
        `${API}/api/auth/google`;

};
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
                           <button
  type="button"
  onClick={googleLogin}
  className="group mt-5 w-full lg:w-80 md:w-120 h-13 md:h-20 lg:h-14 rounded-2xl bg-white text-gray-800 border border-gray-300 hover:border-gray-400 hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 font-semibold"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-6 h-6 md:w-8 md:h-8"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.215 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.277 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.177 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.146 35.091 26.671 36 24 36c-5.194 0-9.623-3.331-11.284-7.946l-6.522 5.025C9.53 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.793 2.256-2.287 4.186-4.274 5.571l6.19 5.238C36.97 38.593 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>

  <span className="text-sm md:text-2xl lg:text-lg">
    Continue with Google
  </span>
</button>
                        </form>
        </>
    )
}

export default AdminLogin