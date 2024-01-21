    // App.js

    import React from 'react';
    import LoginForm from './components/Authentification/LoginForm';
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    import Home, {loader as loaderHome} from "./components/Home/Home";
    import RegisterForm from "./components/Authentification/RegisterForm";
    import Application, {loader as loaderApplication} from "./Application";

    const App = () => {

        // const ProtectedRoute = ({ children }) => {
        //     if (!isAuthenticated()) {
        //         return <Navigate to="/login" replace />;
        //     }
        //
        //     return children;
        // };

        const router = createBrowserRouter([
            {
                path: '/',
                element:   <Application/>,
                loader: loaderApplication,
                children: [
                    {
                        path: '/',
                        element: <Home/>,
                        loader: loaderHome,
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
