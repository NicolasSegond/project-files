    // App.js

    import React, {useState} from 'react';
    import LoginForm from './components/Authentification/LoginForm';
    import {Navigate, createBrowserRouter, RouterProvider} from "react-router-dom";
    import Home, {loader as loaderHome} from "./components/Home/Home";
    import RegisterForm from "./components/Authentification/RegisterForm";
    import {isAuthenticated} from "./services/authService";
    import Application from "./Application";

    const App = () => {

        const ProtectedRoute = ({ children }) => {
            if (!isAuthenticated()) {
                return <Navigate to="/login" replace />;
            }

            return children;
        };

        const router = createBrowserRouter([
            {
                path: '/',
                element:   <Application/>,
                children: [
                    {
                        path: '/',
                        element: <Home/>,
                        loader: loaderHome,
                    },
                    {
                        path: '/home',
                        element: <Home/>,
                        loader: loaderHome,
                    }
                ],
            },
            {
                path: '/login',
                element: <LoginForm/>,
            },
            {
                path: '/register',
                element: <RegisterForm/>,
            }
        ]);

        return (
            <div>
                <RouterProvider router={router}>
                </RouterProvider>
            </div>
        );
    };

    export default App;
