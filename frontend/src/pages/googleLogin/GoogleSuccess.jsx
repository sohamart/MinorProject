import { useContext, useEffect } from "react";
import { AuthContextData } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {

    const {
        loading,
        loggedinStudent,
        loggedinTeacher,
        loggedinAdmin,
        setloading
    } = useContext(AuthContextData);

    const navigate = useNavigate();

    useEffect(() => {

        setloading(true);

        setTimeout(() => {

            if (loggedinStudent) {

                navigate("/student");

                return;
            }

            if (loggedinTeacher) {

                navigate("/teacher");

                return;
            }

            if (loggedinAdmin) {

                navigate("/admin");

                return;
            }

            navigate("/login");

        },2000);

    },[
        loggedinStudent,
        loggedinTeacher,
        loggedinAdmin
    ]);

    return (
        <h1>
            Signing you in...
        </h1>
    );

}