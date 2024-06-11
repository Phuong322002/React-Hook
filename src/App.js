import './App.scss';
import Header from './Component/Header/Header';
import HomePage from './Component/Home/HomePage';
import Users from './Component/User/listQuiz';
import Admin from './Component/Admin/Admins';  
import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

// import {
//   BrowserRouter,
//   Link,
//   Route,
//   Routes,
// } from "react-router-dom";


const App = () => {

  return (
    <div className="app-container">
    <div className='header-container'> 
        <Header/>
    </div>
    <div className='main-container'>
      <div className='sidenav-container'>
        
  </div>
    <div className='route-app-container'>
    <PerfectScrollbar>
    <Outlet/>
    </PerfectScrollbar>
            {/* <button class="btn btn-warning" ><Link style={{ color: 'white' }} to='/'>Home</Link></button>
            <button><Link to="/user">User</Link></button>
            <button><Link to='/admin'>Admin</Link></button> */}
        </div>
    </div>
    {/* <div>
            <button class="btn btn-warning" ><Link style={{ color: 'white' }} to='/'>Home</Link></button>
            <button><Link to="/user">User</Link></button>
            <button><Link to='/admin'>Admin</Link></button>
        </div> */}
    </div>
    // {/* kiểu kiểu tạo ra route cho compo */}
    // {/* <Routes>
    // <Route path="/" element={<HomePage />} />
    // <Route path="/user" element={<Users />} />
    // <Route path="/admin" element={<Admin />} />
    // </Routes> */}
  );
}

export default App;
