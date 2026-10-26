import { useState, createContext } from "react";
export const AuthContext = createContext();

export default function AuthProvider({children}){
    const [IsLoggedIn, SetIsLoggedIn] = useState(false);
    const login = () =>  SetIsLoggedIn(true);
    const logout = () =>  SetIsLoggedIn(false);

    return(
        <AuthContext.Provider value={{IsLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}