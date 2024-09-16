import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import ForgotPassword from "../Components/ForgotPassword";
import ResetPassword from "../Components/ResetPassword";
import { Navigate } from "react-router-dom";
import Home from "../Components/Home";
import URLMonth from "../Components/URLMonth";
import URLDate from "../Components/URLDate";

const AppRoutes = [
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: 'forgotPassword',
        element: <ForgotPassword/>
    },
    {
        path: '/resetPassword/:token',
        element: <ResetPassword/>
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/month',
        element: <URLMonth/>
    },
    {
        path: '/date',
        element: <URLDate/>
    },
    {
        path: '*',
        element: <Navigate to = '/login'/>
    }
]

export default AppRoutes;