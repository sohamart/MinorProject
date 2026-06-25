import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useContext } from "react";
import { AuthContextData } from "../../context/AuthContext";

export default function GoogleSuccess() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const {
        loading,
        loggedinStudent,
        loggedinTeacher,
        loggedinAdmin
    } = useContext(AuthContextData);

    useEffect(() => {

        const error = searchParams.get("error");

        if (error === "not_registered") {
            toast.error("Your Google account is not registered.");
            navigate("/login", { replace: true });
            return;
        }

        if (error === "login_failed") {
            toast.error("Google Login Failed");
            navigate("/login", { replace: true });
            return;
        }

    }, []);

    useEffect(() => {

        if (loading) return;

        if (loggedinStudent) {
            navigate("/student/home", { replace: true });
            return;
        }

        if (loggedinTeacher) {
            navigate("/teacher/home", { replace: true });
            return;
        }

        if (loggedinAdmin) {
            navigate("/admin/home", { replace: true });
            return;
        }

        // Cookie নেই
        navigate("/login", { replace: true });

    }, [
        loading,
        loggedinStudent,
        loggedinTeacher,
        loggedinAdmin
    ]);

    return (
        <div className="w-screen h-screen flex items-center justify-center text-white">
            <h1 className="text-2xl animate-pulse">
                Signing in...
            </h1>
        </div>
    );
}