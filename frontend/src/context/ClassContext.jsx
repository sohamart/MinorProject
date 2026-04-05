import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { AuthContextData } from "./AuthContext";

export const ClassContextData = createContext();

const ClassContext = (props) => {
    const [refresh, setrefresh] = useState(false);

    const [classes, setclasses] = useState([]);
    const [weekly, setweekly] = useState([]); // 🔥 add weekly

    const { loading, setloading } = useContext(AuthContextData);
    const [error, seterror] = useState(null);

    const API = import.meta.env.VITE_API_URI;

    // ==========================
    // TODAY CLASS FETCH
    // ==========================
   const fetchTodayClass = async () => {
    try {
        // 🔥 only first time loading
        if (classes.length === 0) {
            setloading(true);
        }

        const response = await axios.get(
            `${API}/api/class/today/get`,
            { withCredentials: true }
        );

        const data = response?.data?.data?.classes || [];

        setclasses(data);

    } catch (err) {
        seterror("Failed to fetch today classes");
    } finally {
        setloading(false);
    }
};

    // ==========================
  const fetchWeeklyClass = async () => {
    try {
        // only first time loading
        if (weekly.length === 0) {
            setloading(true);
        }

        const res = await axios.get(
            `${API}/api/class/weekly/get`,
            { withCredentials: true }
        );
        console.log(res);
        setweekly(res?.data?.data || []);

    } catch (err) {
        seterror("Failed to fetch weekly classes");
    } finally {
        setloading(false);
    }
};
    // ==========================
    // USE EFFECT
    // ==========================
    useEffect(() => {
    fetchTodayClass();
    fetchWeeklyClass();
}, [refresh]);



    return (
        <ClassContextData.Provider value={{
            classes,
            weekly, // 🔥 add
            loading,
            error,
            API,
            setloading,
            seterror,
            setclasses,
            setweekly,
            setrefresh,
            refresh,

            // 🔥 expose functions (important)
            getTodayClasses: fetchTodayClass,
            getWeeklyClasses: fetchWeeklyClass

        }}>
            {props.children}
        </ClassContextData.Provider>
    );
};

export default ClassContext;