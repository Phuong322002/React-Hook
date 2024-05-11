import React from 'react';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../../assets/logo192.png'
import { MdDashboard } from "react-icons/md";
import './Sidebar.scss'
import { NavLink, withRouter } from "react-router-dom";


const Sidebar = (props) => {
    const { image, collapsed, rtl, toggled, handleToggleSidebar } = props

    console.log('collapsed', collapsed)

    const handleDashboard = () => {

    }
    return (
        <ProSidebar
            image={sidebarBg}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <img src={logo} width='30px' className="App-logo" alt="logo" /> <></>
                    React Hook
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<MdDashboard />}
                        suffix={<span className="badge red">New</span>}
                        onClick={() => { handleDashboard() }}
                    >
                        <NavLink to='/admin'>Dashboard</NavLink>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        icon={<FaGem />}
                        title='Features'
                    >
                        <MenuItem><NavLink to='manage-user'>Quản lý users</NavLink></MenuItem>
                        <MenuItem>Quản lý Quiz</MenuItem>
                        <MenuItem>Quản lý câu hỏi</MenuItem>
                    </SubMenu>

                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a
                        href="https://github.com/azouaoui-med/react-pro-sidebar"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        {collapsed === false
                            ?
                            <>
                                <FaGithub />
                                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    ViewSource
                                </span>
                            </>
                            :
                            <FaGithub />

                        }

                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    )
}

export default (Sidebar);