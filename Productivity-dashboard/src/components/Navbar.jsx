import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Input from "./Input.jsx";
import Button from './Button'
import Avatar from './Avatar'
import { Icons } from './Icons'
const TITLES = {
  dashboard: 'Dashboard',
  todos:     'Todos',
  products:  'Products',
  analytics: 'Analytics',
  settings:  'Settings',
}
function Navbar({ onMenuClick }){
    const { darkMode, Toggle } = useTheme()
    const { pathname } = useLocation()
    const [notifOpen, setNotifOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const ref = useRef(null)
    const page = pathname.replace('/', '')
    const title = TITLES[page] || 'Dashboard'
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setNotifOpen(false)
                setProfileOpen(false)
            }                                                   
        }
        window.addEventListener('mousedown', handler)
        return () => window.removeEventListener('mousedown', handler)
    }, [])
    return(
        <header className="sticky top-0 z-30 bg-white/85 dark:bg-gray-900 backdrop border-b border-gray-200 dark:border-gray-700">
            <div className="h-16 px-4 md:px-6 flex items-center gap-3" ref={ref}>
                {/* Hamburger — opens the sidebar drawer on mobile */}
                <Button variant="ghost" size="iconSm" onClick={onMenuClick} className="lg:hidden">
                    <Icons.Menu className="w-5 h-5" />
                </Button>
                <div className="hidden md:flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Acme</span>
                    <span className="text-gray-300 dark:text-gray-600">/</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
                </div>
                <div className="flex-1 max-w-xl mx-auto">
                    <Input
                        leading={<Icons.Search className="w-4 h-4" />}
                        placeholder="Search tasks, products, projects…"
                    />
                </div>

                <div className="flex items-center gap-1.5">
                    {/* Theme toggle */}
                    <Button variant="ghost" size="iconSm" onClick={Toggle}>
                        {darkMode
                        ? <Icons.Sun className="w-4 h-4" />
                        : <Icons.Moon className="w-4 h-4" />
                        }
                    </Button>

                    {/* Notifications */}
                    <div className="relative ">
                        <Button
                            variant="ghost"
                            size="iconSm"
                            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }}
                        >
                            <Icons.Bell className="w-4 h-4" />
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-gray-900" />
                        </Button>

                        {notifOpen && (
                            <div className="absolute right-0 top-11 w-80 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <span className="text-sm font-semibold">Notifications</span>
                                    <button className="text-xs text-indigo-600 font-medium">Mark all read</button>
                                </div>
                                <div className="py-2 px-4 text-sm text-gray-500 dark:text-gray-400">
                                    No new notifications
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block" />

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }}
                            className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150"
                        >
                            <Avatar name="Maya Okonkwo" size={28} />
                            <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">Maya</span>
                            <Icons.ArrowDown className="hidden sm:block w-3.5 h-3.5 text-gray-400" />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 top-11 w-52 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl py-1.5 overflow-hidden">
                                {['View profile', 'Account settings', 'Keyboard shortcuts', 'Help center'].map(item => (
                                    <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        {item}
                                    </button>
                                ))}
                                <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
                                <button className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
    
}
export default Navbar;