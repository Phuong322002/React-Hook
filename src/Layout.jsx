import {
    BrowserRouter,
    Link,
    Route,
    Routes,
} from "react-router-dom";
import App from './App';
import HomePage from './Component/Home/HomePage';
import Users from './Component/User/listQuiz';
import Admin from './Component/Admin/Admins';
import Dashboard from './Component/Admin/Content/DashBoard';
import ManageUser from './Component/Admin/Content/ManageUser';
import Login from './Component/Auth/Login';
import LoginUser from "./Component/Auth/Login";
import { ToastContainer, toast } from 'react-toastify';
import RegisterUser from "./Component/Auth/RegisterUser";
import DetailQuiz from "./Component/User/DetailQuiz";
import ListQuiz from "./Component/User/listQuiz";
import ManageQuiz from "./Component/Admin/Content/Quiz/ManageQuiz";
import QuestionOfQuiz from "./Component/Admin/Content/Question/QuestionsOfQuiz";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from 'react';

const Notfound = () => {
    return (
        <div className="alert alert-danger mt-3 container" style={{ fontSize: '30px' }}>
            404.ERROR!
        </div>
    )
}

const Layout = () => {

    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="user" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admin" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<Dashboard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                    <Route path="manage-quiz" element={<ManageQuiz />} />
                    <Route path="questions" element={<QuestionOfQuiz />} />
                </Route>

                <Route path='/login' element={<LoginUser />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="*" element={<Notfound />} />


            </Routes>
            <ToastContainer
                position="top-right"
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
            {/* Same as */}
        </Suspense>
    )
}

export default Layout;