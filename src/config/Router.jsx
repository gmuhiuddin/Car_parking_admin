import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { setUser, removeUser } from '../store/userSlice.jsx';
import { auth } from './firebase.jsx';
import Home from '../views/Home';
import Login from '../views/Login';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
            element: <Home />,
        },
        {
            path: "/login",
        element: <Login />,
    }
        ]
    }
]);

function Layout (){

    const res = useSelector(res => res.userSlice.user);

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        onAuthStateChanged(auth, async user => {
            if (user) {
                
                if (!res.uid) {
                    dispatch(setUser({ uid: "user.uid "}));
                };
            } else {
                res.uid && dispatch(removeUser());  
            };
        });
    }, []);

    useEffect(() => {
        if (res.uid) {


            if (pathname == "/login" ) {
                navigate("/");
            };
        } else {
            if (pathname == "/") {
                navigate("/login");
            };
        };
    }, [res, pathname]);

    return(
        <>
        <Outlet />
        </>
    )
};

const Router = () => {
    return(
        <RouterProvider router={router}/>
    )
};

export default Router;