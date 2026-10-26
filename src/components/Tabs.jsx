
export default function Tabs({tabs, active, onChange, className = ""}){
    return(
        <div className={`inline-flex p-1 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${className}`}> 
            {tabs.map(tab => (
                <button
                    className={`px-3 h-8 rounded-xl text-sm font-medium transition-all duration-150
                        ${active === tab.id
                            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-500 dark: text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}