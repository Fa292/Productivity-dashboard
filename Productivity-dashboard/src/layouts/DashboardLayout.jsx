import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {Outlet} from "react-router-dom"

function DashboardLayout(){
    return(
        <div style={{display: "flex"}}>
            <Sidebar/>
            <div style={{flex: 1}}>
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    )
}
export default DashboardLayout;