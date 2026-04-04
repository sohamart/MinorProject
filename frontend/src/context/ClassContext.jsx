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
        try {
            

            const response = await axios.get(
                `${API}/api/class/today`,
                { withCredentials: true }
            );

            const data = response?.data?.todayclass?.classes || [];

            setclasses(data);

            // 🔥 MAIN FIX (retry once if empty)
            if (data.length === 0) {
                setTimeout(async () => {
                    const retry = await axios.get(
                        `${API}/api/class/today`,
                        { withCredentials: true }
                    );

                    setclasses(retry?.data?.todayclass?.classes || []);
                }, 500); // wait for backend autoCopy
            }

        } catch (err) {
            console.log(err);
            seterror("error");
        } finally {
            
        }
    };

    fetchTodayClass();

    const interval = setInterval(() => {
        fetchTodayClass()
    }, 3000)

    return () => clearInterval(interval)
}, [refresh]);


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
