    // App.js

    import React, {useState} from 'react';
    import LoginForm from './LoginForm';
    import {Navigate, createBrowserRouter, RouterProvider} from "react-router-dom";
    import Home from "./components/Home";
    import RegisterForm from "./RegisterForm";
    import {isAuthenticated} from "./services/authService";
    import Application from "./Application";

    const App = () => {
        const [token] = useState(localStorage.getItem('token'));

        const ProtectedRoute = ({ children }) => {
            if (!isAuthenticated()) {
                return <Navigate to="/login" replace />;
            }

            return children;
        };

        const router = createBrowserRouter([
            {
                path: '/',
                element:  <ProtectedRoute> <Application/> </ProtectedRoute>,
                children: [
                    {
                        path: '/',
                        element: <Home token={token}/>,
                    },
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
