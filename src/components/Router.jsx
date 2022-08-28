import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { AddCategory } from "../pages/admin/AddCategory";
import { Categories } from "../pages/Categories";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { MyPage } from "../pages/MyPage";
import { NotFound } from "../pages/NotFound";
import { Signup } from "../pages/Signup";
import { Threads } from "../pages/Threads";
import { Header } from "./modules/Header";

export const Router = () =>{
    return(
        <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="home" element={<Home />} />
                <Route path="categories" element={<Categories />} />
                <Route path="threads" element={<Threads />} />
                <Route path="mypage" element={<MyPage />} />
                <Route path='admin/addcategory' element={<AddCategory />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}