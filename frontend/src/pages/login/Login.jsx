
import LoginStudent from '../../components/login/StudentLogin/'
import LoginTeacher from '../../components/login/TeacherLogin/'
import LoginAdmin from '../../components/login/AdminLogin/'
import { useState, useContext } from 'react'
import { useEffect } from 'react'
import { AuthContextData } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'



const Login = () => {
    const [stlogin, setstlogin] = useState(false)
    const [trlogin, settrlogin] = useState(false)
    const [adlogin, setadlogin] = useState(false)
    const {loggedinStudent, loggedinAdmin, loggedinTeacher, loading } = useContext(AuthContextData)
    const navigate = useNavigate()
    useEffect(() => {
      if(loggedinStudent !== null ){
        navigate("/student/")
      }
      else if(loggedinAdmin !== null){
        navigate("/admin/")
      }
      else if(loggedinTeacher !== null){
        navigate("/teacher/")
      }
    
      
    }, [loggedinStudent, loggedinAdmin, loggedinTeacher ])
    if(loading){
        return <Loading></Loading>
    }
    
    

    const onhandelstudent = () => {
        setstlogin(!stlogin)
        settrlogin(false)
        setadlogin(false)

    }
    const onhandelteacher = () => {
        
        settrlogin(!trlogin)
        setstlogin(false)
        setadlogin(false)
    
    }
    const onhandeladmin = () => {
         setadlogin(!adlogin)
        setstlogin(false)
        settrlogin(false)
       
    }

  return (
    <>
        <div className='bg-black text-2xl text-white border-b-2 border-amber-50 pl-12 pr-12 h-15 lg:w-120 lg:h-15 md:w-180 md:h-25 sm:w-120 flex  items-center justify-center rounded-b-2xl'>
            <h1>Login Page</h1>
            
            
        </div>
        
        <div className='w-full h-15  lg:w-120 md:w-full sm:w-full md:h-25  lg:h-12 flex items-center justify-center lg:rounded-2xl mt-4 gap-4 md:gap-10 lg:gap-12'>
                <button
                onClick={onhandelstudent} 
                className=' active:scale-95 transition ease-in-out duration-300 bg-green-400 border-2 border-amber-50 w-23 h-12 lg:w-30 lg:h-12 md:w-40 md:h-22 md:text-3xl sm:w-30 sm:h-12 rounded-2xl  lg:text-2xl flex items-center justify-center'>Student</button>
                <button 
                 onClick={onhandelteacher}
                className=' active:scale-95 bg-amber-400 border-2 duration-300 border-amber-50 lg:w-30 lg:h-12 md:w-40 md:h-22 md:text-3xl sm:w-30 sm:h-12 rounded-2xl w-23 h-12 lg:text-2xl flex items-center justify-center'>Teacher</button>
                <button
                onClick={onhandeladmin}
                className='active:scale-95 bg-red-400 border-2 duration-300 border-amber-50 lg:w-30 lg:h-12 md:w-40 md:h-22 md:text-3xl sm:w-30 sm:h-12 rounded-2xl w-23 h-12 lg:text-2xl flex items-center justify-center'>Admin</button>

            </div>
            <div className='relative w-80 h-100 md:w-180 md:h-220 lg:w-100  flex lg:h-120   items-center justify-center rounded-2xl mt-4 overflow-hidden'>
                <div className={`absolute w-full bg-black h-1/2 top-0 z-10 transform transition-all duration-500 ease-in-out  border-b-2 border-amber-50 
                    ${!stlogin && !trlogin && !adlogin ? "scale-y-100 " : "scale-y-0 "} origin-top`}></div>
                
                <div className={`absolute z-11 bg-white w-26 h-10 rounded-2xl flex items-center justify-center ransform transition-all duration-500 ease-in-out
                    
                    ${!stlogin && !trlogin && !adlogin ? "opacity-100 " : "opacity-0 scale-x-0"} origin-center`}>
                    <h1 > Form Close</h1>
                </div>
                    
                <div className={`absolute w-full bg-black h-1/2 bottom-0 z-10 transform transition-all duration-500 ease-in-out  border-t-2 border-amber-50
                    ${!stlogin && !trlogin && !adlogin ? "scale-y-100 " : "scale-y-0 "} origin-bottom`}></div>
               {stlogin && < LoginStudent open={stlogin} />}
               {trlogin && <LoginTeacher open={trlogin} />}
               {adlogin && <LoginAdmin />}
            </div>
        <h1 className='lg:text-xl md:text-3xl text-red-500 lg:mt-0 mt-4 '>*please select login role to open form*</h1>
    </>
  )
}

export default Login
