import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContextData } from "./AuthContext";





export const ClassContextData = createContext()


const ClassContext = (props) => {
    const [classes, setclasses] = useState([])
    const { loading, setloading } = useContext(AuthContextData)
    const [error, seterror] = useState(null)
    const API = import.meta.env.VITE_API_URI
    useEffect(() => {   
    
        const fetchTodayClass = async () => {   
            try{
            const response = await axios.get(`${API}/api/class/todayclass/find`, { withCredentials: true })
            setclasses(response?.data?.todayclass?.[0]?.classes || []);
            
            }
            catch{
                console.log("error")
                setloading(false)
                seterror("error")
            }
            finally{
                setTimeout(() => {
                    setloading(false)
                }, 500)
            }
        }




        fetchTodayClass()
        
    
    }, [])


    return (
    <div>
      <ClassContextData.Provider value={{
        classes,
        loading,
        error,
        API,
        setloading,
        seterror,
        setclasses

      }}>
        {props.children}
      </ClassContextData.Provider>
    </div>
  )
}

export default ClassContext 
