import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from './Component/Home/HomePage';
import Users from './Component/User/Users';
import Admin from './Component/Admin/Admins';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} >
        <Route index element={<HomePage />} />
        <Route path="/user" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
    </Route>
   
    </Routes>
    </BrowserRouter>
      {/* <App /> */}
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
