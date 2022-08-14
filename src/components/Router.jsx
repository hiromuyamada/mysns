import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Categories } from "../pages/Categories";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Signup } from "../pages/Signup";
import { Threads } from "../pages/Threads";
import { Header } from "./modules/Header";

export const Router = () =>{
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="home" element={<Home />} />
                <Route path="categories" element={<Categories />} />
                <Route path="threads" element={<Threads />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}