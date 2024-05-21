import { useState } from "react";
import Sidebar from "./Sidebar"
import './admin.scss'
import { FaHeart, FaBars } from 'react-icons/fa';
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Admin = (props) => {
    const [status, setStatus] = useState(false);

    const handleShowHideSideBar = () => {
        setStatus(!status)
    }
    return (
        <div className="admin-container">
            {/* 
            {status === false
                ?
                <>
                    <div className="admin-sidebar">
                        <Sidebar />
                    </div>
                    <div className="admin-content" >
                        <FaBars onClick={() => { handleShowHideSideBar() }} />
                    </div>
                </>
                :
                <>

                    <div className="admin-sidebar">
                        <Sidebar collapsed={status} />
                    </div>
                    <div className="admin-content" >
                        <FaBars onClick={() => { handleShowHideSideBar() }} />
                    </div>
                </>
            } */}

            <div className="admin-sidebar">
                <Sidebar collapsed={status} />
            </div>
            <div className="admin-content" >
                <div className="admin-header">
                    <FaBars onClick={() => { handleShowHideSideBar() }} />
                </div>
                <div className="admin-main-content">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Admin