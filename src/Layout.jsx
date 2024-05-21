import {
    BrowserRouter,
    Link,
    Route,
    Routes,
} from "react-router-dom";
import App from './App';
import HomePage from './Component/Home/HomePage';
import Users from './Component/User/Users';
import Admin from './Component/Admin/Admins';
import Dashboard from './Component/Admin/Content/DashBoard';
import ManageUser from './Component/Admin/Content/ManageUser';
import Login from './Component/Auth/Login';
import LoginUser from "./Component/Auth/Login";
import { ToastContainer, toast } from 'react-toastify';


const Layout = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="user" element={<Users />} />
                </Route>

                <Route path="/admin" element={<Admin />} >
                    <Route index element={<Dashboard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>

                <Route path='/login' element={<LoginUser />} />

            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout;