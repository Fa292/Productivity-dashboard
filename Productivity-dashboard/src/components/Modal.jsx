import { useEffect } from "react";
import Button from "./Button";
import { Icons } from "./Icons";

export default function Modal({open, onClose, title, children, footer, size = "md"}){
    useEffect(() => {
        if (!open) return
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose])
    if (!open) return null
    const widths = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl"
    }

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={`relative w-full ${widths[size]} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <Button variant="ghost" size="iconSm" onClick={onClose}>
                        <Icons.X className="w-4 h-4" />
                    </Button>
                </div>
                <div className="p-6">{children}</div>
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2 bg-gray-50 dark:bg-gray-900/50">
                        {footer}
                    </div>
                )}
            </div>

            
        </div>
    )
}