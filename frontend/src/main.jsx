import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthContext from './context/AuthContext'
import ClassContext from './context/ClassContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(

<GoogleOAuthProvider
clientId={
import.meta.env.VITE_GOOGLE_CLIENT_ID
}
>




    <AuthContext>
        <ClassContext>
            <BrowserRouter>
                <App />
                <ToastContainer
                    position="top-right"
                    autoClose={6000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    className=" text-xl "


                />
            </BrowserRouter>
        </ClassContext>
    </AuthContext>
</GoogleOAuthProvider>
)
