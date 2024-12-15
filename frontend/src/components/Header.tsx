import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-10 bg-slate-600 text-white">
      <ul className="flex justify-around h-full items-center">
        <li className="h-full flex justify-center items-center px-2 ">
          <Link to="/">Home</Link>
        </li>
        <li className="h-full flex justify-center items-center px-2 ">
          <Link to="/market">Market</Link>
        </li>
        <li className="h-full flex justify-center items-center px-2 ">
          <Link to="/cart">Cart</Link>
        </li>
        <li className="h-full flex justify-center items-center px-2 ">
          <Link to="signin">Sign in</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
