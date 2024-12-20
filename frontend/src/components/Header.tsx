import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../store/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
  };

  return (
    <header className="w-full h-10 bg-slate-600 text-white">
      <ul className="flex justify-around h-full items-center">
        <li className="h-full flex justify-center items-center px-2 ">
          <Link to="/">Home</Link>
        </li>
        <li className="h-full flex justify-center items-center px-2 ">
          <Link to="/cart">Cart</Link>
        </li>
        {!isLogin ? (
          <li className="h-full flex justify-center items-center px-2 ">
            <Link to="signin">Sign in</Link>
          </li>
        ) : (
          <li
            className="h-full flex justify-center items-center px-2 cursor-pointer"
            onClick={() => handleLogout()}
          >
            Sign out
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
