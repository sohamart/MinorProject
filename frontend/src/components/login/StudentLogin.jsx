import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { AuthContextData } from '../../context/AuthContext'
import { Circle, CircleCheck } from 'lucide-react'




const StudentLogin = () => {
    const { setloggedinStudent, loggedinName, setloggedinName, API } = useContext(AuthContextData)

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const Navigate = useNavigate()
    const [userNotFound, setuserNotFound] = useState("")
    const [showPassword, setShowPassword] = useState(false)




    const formhandel = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `${API}/api/auth/student/login`,
                { email, password },
                { withCredentials: true }
            )


            setloggedinStudent(response.data.Studentuser)
            setloggedinName(response.data.Studentuser.name)

            Navigate("/student/")

        } catch (error) {
            console.log(error.response.data.message)
            setuserNotFound(error.response.data.message)
            setloggedinStudent(null)
            // 👈 main line
        }
        setemail("")
        setpassword("")

    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    formhandel(e)

                }}
                className={`bg-yellow-400 relative   lg:w-100  lg:p-5 w-80 md:w-180  p-5 md:p-15 rounded-2xl shadow-lg flex flex-col items-center justify-center`} action="">
                <h1 className=' absolute md:top-13 lg:top-8  top-7 text-2xl lg:text-2xl uppercase font-bold md:text-5xl' >student Login</h1>
                {userNotFound && <h1 className=' absolute md:top-25 lg:top-15 top-13 text-red-500'>{userNotFound}!!</h1>}
                <input
                    value={email}
                    onChange={(e) => {
                        setemail(e.target.value)
                    }}
                    placeholder='Email' required className='bg-white m pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10 mt-15 md:w-120 md:h-20 md:mt-20  lg:w-80 lg:h-13 lg:mt-18' type="email" />
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }}
                    placeholder='Password' required className=' bg-white pl-4 md:placeholder:text-2xl rounded-2xl w-60 h-10 mt-5 md:w-120 md:h-20 md:mt-10  lg:w-80 lg:h-13 lg:mt-5' />
                <div className='flex gap-1 items-center justify-end mt-2 w-full mr-12'>
                    <button
                        className=''
                        type="button"   // ⚠️ important (form submit na hoy)
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <CircleCheck className='w-5 mt-1' /> : <Circle className='w-5 mt-1' />}
                    </button>
                    <h1 className=' text-sm'>show password</h1>
                </div>

                <button className=' active:scale-95 duration-300 bg-black text-white rounded-2xl w-25 h-11 mt-5 md:text-2xl md:w-60 md:h-20 md:mt-10  lg:w-33 lg:h-14 uppercase border border-amber-50 lg:mt-5'>Login</button>
            </form>
        </>
    )
}


export default StudentLogin
