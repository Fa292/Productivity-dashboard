import {AuthContext} from "../context/Authcontext.jsx"
import { useContext } from "react"
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children}){
    
    const { IsLoggedIn } = useContext(AuthContext);
    if (!IsLoggedIn){
        return <Navigate to="/login"/>
    }
    return children;
}