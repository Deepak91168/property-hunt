import React, { useState, useContext } from "react";
import homeurl from "../assets/images/home.png";
import { TypeEffect } from "../components/TypeEffect";
import { useNavigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Loader } from "../components/Loader";
import ThemeContext from "../context/ThemeContext";
export const Home = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const { loggedin, checkingstatus } = useAuthStatus();
  if (checkingstatus) {
    return <Loader />;
  }

  const textColor = (value) => {
    return theme ? "text-black" : value;
  };

  const btnTheme = theme
    ? "bg-black hover:text-black hover:border-black focus:ring-gray-500 "
    : "bg-red-600  hover:text-red-700 hover:border-red-500 ";

  const fullbtn =
    btnTheme +
    " w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-md font-medium text-white  hover:bg-transparent hover:border-2  focus:outline-none transition-all focus:ring-2 focus:ring-offset-2 ";

  return (
    <div
      className="absolute top-0 bg-cover bg-no-repeat bg-center h-screen w-full p-4"
      style={{ backgroundImage: `url(${homeurl})` }}
    >
      <div className=" h-full flex flex-col items-center justify-center mb-4 z-10 ">
        <div
          className={`font-extrabold text-xl sm:text-3xl text-center ${textColor(
            "text-[#c40c1c]"
          )} pb-4`}
        >
          Welcome to Property Hunt
        </div>
        <div
          className={`text-center text-2xl sm:text-6xl font-extrabold ${textColor(
            "text-red-500"
          )} `}
        >
          Your Gateway to Exceptional Properties <br /> Discover{" "}
          <span className={`${theme ? "text-gray-500" : "text-[#c40c1c]"}`}>
            {" "}
            <TypeEffect />{" "}
          </span>
        </div>
        <div className="sm:w-[20%] flex space-x-2 justify-center mb-2 mt-6 sm:mt-8">
          <button
            type="button"
            className={fullbtn}
            onClick={() => {
              navigate("/properties");
            }}
          >
            Explore
          </button>
          {!loggedin && (
            <button
              className={fullbtn}
              onClick={() => {
                navigate("/singin");
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/* <div className="bg-red-500 h-96 "></div> */}
    </div>
  );
};
// border-2 border-red-50
