import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { AuthContextData } from "./AuthContext";

export const ClassContextData = createContext();

const ClassContext = (props) => {
    const [WeeklyClass, setWeeklyClass] = useState(null)
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
                console.log(res.data.weeklyclass)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchWeeklyClass()
    }, [])

    return (
        <ClassContextData.Provider value={{
            WeeklyClass,
            setWeeklyClass,
            error,
            loading,
        

        }}>
            {props.children}
        </ClassContextData.Provider>
    );
};

export default ClassContext;