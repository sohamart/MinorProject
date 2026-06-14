import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react'


export const AuthContextData = createContext()

const AuthContext = (props) => {
  const [loggedinStudent, setloggedinStudent] = useState(null)
  const [loggedinTeacher, setloggedinTeacher] = useState(null)
  const [loggedinAdmin, setloggedinAdmin] = useState(null)
  const [loading, setloading] = useState(true)
  const [loggedinName, setloggedinName] = useState("")
  const API = import.meta.env.VITE_API_URI

  // 👉 SIDEBAR
    const [navopen, setnavopen] = useState(false);
    const [showCross, setShowCross] = useState(false);
  
    // 👉 OPEN
    const openNav = () => {
      setnavopen(true);
      setTimeout(() => {
        setShowCross(true); // delay diye cross ashbe
      }, 300);
    };
  
    // 👉 CLOSE (sequence)
    const closeNav = () => {
      setShowCross(false); // age cross hide
      setTimeout(() => {
        setnavopen(false); // tarpor sidebar close
      }, 300);
    };




  useEffect(() => {
    const fetchuser = async () => {
      
      try{
        try {
        const res = await axios.get(`${API}/api/auth/loggedinStudent/find`,
          { withCredentials: true }
        )
        setloggedinStudent(res.data)
        setloggedinName(loggedinStudent?.name)

      }
      catch {
        console.log("Student not Login ")
        setloggedinStudent(null)
      }
      try {
        const res = await axios.get(`${API}/api/auth/loggedinAdmin/find`,
          { withCredentials: true }
        )
        setloggedinAdmin(res.data)
        setloggedinName(loggedinAdmin?.name)

      }
      catch {
        console.log("Admin not loggedin")
        setloggedinAdmin(null)
      }
      finally {
        setTimeout(() => {
          setloading(false)
        }, 2000)
      }
      try {
        const res = await axios.get(`${API}/api/auth/loggedinTeacher/find`,
          { withCredentials: true }
        )
        setloggedinTeacher(res.data)
        setloggedinName(loggedinTeacher?.name)

      }
      catch {
        console.log("Teacher not loggedin")
        setloggedinTeacher(null)
      }
      finally {
        setTimeout(() => {
          setloading(false)
        }, 2000)
      }

      }
      catch{
        console.log("user not found ")
        setloggedinStudent(null)
        setloggedinTeacher(null)
        setloggedinAdmin(null)
      }
      finally {
        setTimeout(() => {
          setloading(false)
        }, 2000)
      }
     
    }
    fetchuser()
    

  }, [])

  return (
    <div>
      <AuthContextData.Provider value={{ 
        loggedinTeacher, 
        loggedinStudent, 
        setloggedinTeacher, 
        setloggedinStudent, 
        loading,
        loggedinAdmin,
        setloggedinAdmin,
        setloggedinName,
        loggedinName,
        API,
        setloading,
        navopen,
        setnavopen,
        showCross,
        setShowCross,
        openNav,
        closeNav,
        
        }}>
        {props.children}
      </AuthContextData.Provider>
    </div>
  )
}

export default AuthContext
