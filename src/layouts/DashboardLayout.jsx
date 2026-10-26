import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import NewTaskModal from "../components/NewTaskModal.jsx";
import { SEED_TODOS } from "../data/todos.js";

function DashboardLayout(){
    const [todos, setTodos] = useState(SEED_TODOS)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [taskOpen, setTaskOpen] = useState(false)

    const openTask = () => setTaskOpen(true)

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(t =>
            t.id === id
                ? { ...t, done: !t.done, progress: !t.done ? 100 : t.progress }
                : t
        ))
    }

    const addTodo = (todo) => {
        setTodos(prev => {
            const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1
            return [
                { id: nextId, done: false, progress: null, assignees: ['Maya Okonkwo'], ...todo },
                ...prev,
            ]
        })
    }

    return(
        <div className="flex h-screen overflow-hidden">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNewTask={openTask} />
            <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 bg-gray-100 dark:bg-gray-950 p-4 md:p-6 lg:p-8">
                    <Outlet context={{ todos, toggleTodo, addTodo, openTask }} />
                </main>
            </div>

            <NewTaskModal open={taskOpen} onClose={() => setTaskOpen(false)} onCreate={addTodo} />
        </div>
    )
}
export default DashboardLayout;