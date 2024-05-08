import { useState } from "react";
import Sidebar from "./Sidebar"
import './admin.scss'
import { FaHeart, FaBars } from 'react-icons/fa';

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
                <FaBars onClick={() => { handleShowHideSideBar() }} />

            </div>
        </div>
    )
}

export default Admin