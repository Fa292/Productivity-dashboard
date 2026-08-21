import { useEffect } from "react";
import { Icons } from "./Icons";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
function Sidebar({ open, onClose, onNewTask }){
    const NAV = [
        { id: 'dashboard', label: 'Dashboard', Icon: Icons.Dashboard },
        { id: 'todos',     label: 'Todos',     Icon: Icons.Check,    badge: 4 },
        { id: 'products',  label: 'Products',  Icon: Icons.Box },
        { id: 'analytics', label: 'Analytics', Icon: Icons.Chart },
        { id: 'settings',  label: 'Settings',  Icon: Icons.Settings },
    ]
    const PROJECTS = [
        { name: 'Q3 Launch',         color: '#4F46E5' },
        { name: 'Mobile App',        color: '#10B981' },
        { name: 'Design System',     color: '#F59E0B' },
        { name: 'Customer Research', color: '#EC4899' },
    ]
    const navigate = useNavigate()
    const {pathname} = useLocation()

    // Close the mobile drawer whenever the route changes.
    useEffect(() => { onClose() }, [pathname])

    return(
        <>
            {/* Backdrop — only on mobile, click anywhere to close */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            {/* Slides in as a drawer below lg; sits inline as a rail at lg+ */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-[285px] transition-transform duration-300
                    lg:static lg:z-auto lg:translate-x-0
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    flex flex-col h-full shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
                `}
            >
                <div className="h-16 px-5 flex gap-2.5 items-center border-b border-gray-200 dark:border-gray-700">
                    <Icons.Logo className="w-10 h-10 shrink-0"/>
                    <div>
                        <p className="font-bold text-lg tracking-tight dark:text-white">Helix</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Workspace · Acme</p>
                    </div>
                    {/* Close button — mobile only */}
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="ml-auto lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150"
                    >
                        <Icons.X className="w-5 h-5" />
                    </button>
                </div>
                <div className="px-3 pt-4">
                    <Button onClick={onNewTask} leading={<Icons.Plus className="w-4 h-4"/>} children="New Task" variant="primary" size="lg" className="w-full "/>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 pt-4 pb-2">
                    <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold px-3 mb-2">
                    Workspace
                    </div>
                    <ul className="space-y-1">
                        {NAV.map(({ id, label, Icon, badge }) => {
                            const active = pathname.includes(id)
                            return (
                                <li key={id}>
                                    <button
                                        onClick={() => navigate(`/${id}`)}
                                        className={`
                                            w-full flex items-center gap-3 h-10 px-3 rounded-xl text-sm font-medium transition-all duration-150
                                            ${active
                                            ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                            }
                                        `}
                                    >
                                    <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                                    <span className="flex-1 text-left">{label}</span>
                                    {badge && (
                                        <span className={`h-5 min-w-5 px-1.5 inline-flex items-center justify-center rounded-md text-[11px] font-semibold ${active ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                            {badge}
                                        </span>
                                    )}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold px-3 mt-7 mb-2">
                        Projects
                    </div>
                    <ul className="space-y-1">
                        {PROJECTS.map(p => (
                            <li key={p.name}>
                                <button className="w-full flex items-center gap-3 h-9 px-3 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-150">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                                    <span className="flex-1 text-left truncate">{p.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

            </div>
        </>
    )
}

export default Sidebar;