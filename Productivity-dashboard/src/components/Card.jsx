
export default function Card({className = "", children}){
    return(
        <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md ${className}`}>
            {children}
        </div>
    )
    
}