import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContextData } from "./AuthContext";





export const ClassContextData = createContext()


const ClassContext = (props) => {
    const [refresh, setrefresh] = useState(false);

    const [classes, setclasses] = useState([])
    const { loading, setloading } = useContext(AuthContextData)
    const [error, seterror] = useState(null)
    const API = import.meta.env.VITE_API_URI
    useEffect(() => {   
    
        const fetchTodayClass = async () => {   
            try{
            const response = await axios.get(`${API}/api/class/today`, { withCredentials: true })
            setclasses(response?.data?.todayclass?.classes || []);
            
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
        
    
    }, [refresh])


    return (
    <div>
      <ClassContextData.Provider value={{
        classes,
        loading,
        error,
        API,
        setloading,
        seterror,
        setclasses,
        setrefresh,
        refresh

      }}>
        {props.children}
      </ClassContextData.Provider>
    </div>
  )
}

export default ClassContext 
