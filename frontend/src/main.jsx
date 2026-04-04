import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from "react-router-dom";
import AuthContext from './context/AuthContext'
import ClassContext from './context/ClassContext'
 

createRoot(document.getElementById('root')).render(
    
    
    <AuthContext>
    <ClassContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ClassContext>
    </AuthContext>
 
)
