import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();
export default function ThemeProvider({children}){
    const [darkMode, setDarkMode] = useState(() => {
        try {return localStorage.getItem("theme") === "dark"}
        catch {return false}
    });
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark");
        } else{
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light");
        }
    }, [darkMode])
    const Toggle = () =>{
        setDarkMode(!darkMode);
    }
    return(
        <ThemeContext.Provider value ={{Toggle, darkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => useContext(ThemeContext);