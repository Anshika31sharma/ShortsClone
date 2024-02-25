import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import {
  FaYoutube,
  FaHome,
  FaFire,
  FaRegNewspaper,
  FaSubscript,
} from "react-icons/fa";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="navbar bg-gray-900  p-4 flex justify-between overflow-hidden items-center w-full sticky">
      <div className="flex items-center">
        <div className="menu-icon text-white mr-4" onClick={toggleSidebar}>
          <AiOutlineMenu className="text-2xl" />
        </div>
        <div className="logo flex items-center text-white text-2xl font-bold">
          <FaYoutube className="text-red-500 mr-2" />
          YouTube
        </div>
      </div>
      <div className="search-bar flex-grow mt-4 lg:ml-20 lg:mt-0 flex items-center w-full">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 text-white px-2 py-1 rounded-md w-full lg:w-auto"
        />
        <AiOutlineSearch className="text-white ml-2 text-2xl" />
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="overlay fixed inset-0 bg-black opacity-50"
            onClick={closeSidebar}
          ></div>
          <div className="sidebar bg-gray-900 h-screen mt-16 w-64 fixed top-0 overflow-y-auto">
            <a href="#" className="text-white p-4 flex items-center">
              <FaHome className="text-2xl mr-2" />
              Home
            </a>
            <a href="#" className="text-white p-4 flex items-center">
              <FaFire className="text-2xl mr-2" />
              Trending
            </a>
            <a href="#" className="text-white p-4 flex items-center">
              <FaRegNewspaper className="text-2xl mr-2" />
              Subscriptions
            </a>
            <a href="#" className="text-white p-4 flex items-center">
              <FaSubscript className="text-2xl mr-2" />
              Library
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
