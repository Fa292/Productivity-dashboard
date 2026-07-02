import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {Outlet} from "react-router-dom"

function DashboardLayout(){
    return(
        <div className="flex h-screen overflow-hidden">
            <Sidebar/>
            <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
                <Navbar/>
                <main className="flex-1 bg-gray-100 dark:bg-gray-950 p-4 md:p-6 lg:p-8">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default DashboardLayout;