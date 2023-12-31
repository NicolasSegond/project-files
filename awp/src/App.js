    // App.js

    import React, {useEffect, useState} from 'react';
    import LoginForm from './LoginForm';
    import {Route, Navigate, BrowserRouter, Outlet, Routes} from "react-router-dom";
    import Home from "./components/Home";
    import RegisterForm from "./RegisterForm";
    import {isAuthenticated} from "./services/authService";

    const App = () => {
        const [token, setToken] = useState(localStorage.getItem('token'));

        const ProtectedRoute = ({ children }) => {
            if (!isAuthenticated()) {
                return <Navigate to="/login" replace />;
            }

            return children;
        };

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route exact path="/" element={<ProtectedRoute> <Home token={token}/> </ProtectedRoute> }/>
                </Routes>
            </BrowserRouter>
        );
    };

    export default App;
