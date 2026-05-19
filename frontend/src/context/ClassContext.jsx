import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
// import { AuthContextData } from "./AuthContext";

export const ClassContextData = createContext();

const ClassContext = (props) => {
    const [WeeklyClass, setWeeklyClass] = useState([])
    const [TodayClass, setTodayClass] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const API = import.meta.env.VITE_API_URI

    
    useEffect(() => {
        const fetchWeeklyClass = async () => {
            try {
                const res = await axios.get(`${API}/api/class/weekly/get`, {
                    withCredentials: true
                })
                setWeeklyClass(res.data.weeklyclass)
                setLoading(false)
                // console.log(res.data.weeklyclass)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        const fetchTodayClass = async () => {
            try {
                const res = await axios.get(`${API}/api/class/today/get`, {
                    withCredentials: true
                })
                setTodayClass(res.data)
                setLoading(false)
                // console.log(res.data)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchWeeklyClass()
        fetchTodayClass()

        const interval = setInterval(() => {
            fetchWeeklyClass();
            fetchTodayClass();
        }, 1000); // 3 sec

        return () => clearInterval(interval); 
    }, [])

    return (
        <ClassContextData.Provider value={{
            WeeklyClass,
            setWeeklyClass,
            error,
            loading,
            TodayClass,
            setTodayClass,
        

        }}>
            {props.children}
        </ClassContextData.Provider>
    );
};

export default ClassContext;