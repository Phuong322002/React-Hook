import { useState } from "react";
import Sidebar from "./Sidebar"
import './admin.scss'
import { FaHeart, FaBars } from 'react-icons/fa';
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import PerfectScrollbar from 'react-perfect-scrollbar'

const Admin = (props) => {

    const navigate = useNavigate()

    const [status, setStatus] = useState(false);

    const handleShowHideSideBar = () => {
        setStatus(!status)
    }

    const handleBackHome = () => {
        navigate('/')
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
                    <IoHome className="back-home" onClick={() => { handleBackHome() }} />

                </div>
                <div className="admin-main-content">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>

        </div>
    )
}

export default Admin