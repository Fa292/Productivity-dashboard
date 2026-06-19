import { useMemo } from "react";

export default function Avatar({name = "A", size = 32, className=""}){
    const safeName = String(name || "A")
    
    const initials = safeName.split(" ").map(word => word[0]).slice(0, 2).join("").toUpperCase()
    const hue = useMemo(() => {
        let h = 0
        for (const char of safeName){
            h = (h * 31 + char.charCodeAt(0)) % 360
        }
        return h
    }, [safeName])
    return(
        <div
            style={{
                width: size,
                height: size,
                fontSize: size * 0.4,
                background: `linear-gradient(135deg, hsl(${hue} 70% 60%), hsl(${(hue + 40) % 360} 70% 45%))`,
            }}
            className={`rounded-full flex items-center justify-center text-white font-semibold shrink-0 ${className}`}
        >
            {initials}
        </div> 
    )
}