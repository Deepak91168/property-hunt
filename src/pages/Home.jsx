import React, { useState } from "react";
import homeurl from "../assets/images/home.png";
import { TypeEffect } from "../components/TypeEffect";
import { useNavigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Loader } from "../components/Loader";
const fullbtn =
  "w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-md font-medium text-white bg-red-600  hover:text-red-700 hover:bg-transparent hover:border-2 hover:border-red-500 focus:outline-none transition-all focus:ring-2 focus:ring-offset-2 focus:ring-red-500";
export const Home = () => {
  const navigate = useNavigate();
  const { loggedin, checkingstatus } = useAuthStatus();
  if (checkingstatus) {
    return <Loader />;
  }

  return (
    <div
      className="absolute top-0 bg-cover bg-no-repeat bg-center h-screen w-full p-4"
      style={{ backgroundImage: `url(${homeurl})` }}
    >
      <div className=" h-full flex flex-col items-center justify-center mb-4 z-10 ">
        <div className="font-extrabold text-2xl sm:text-3xl text-[#c40c1c] pb-4">
          Welcome to Property Hunt
        </div>
        <div className="text-center text-4xl sm:text-6xl font-extrabold text-red-500">
          Your Gateway to Exceptional Properties <br /> Discover{" "}
          <span className="text-[#c40c1c]">
            {" "}
            <TypeEffect />{" "}
          </span>
        </div>
        <div className="sm:w-[20%] flex space-x-2 justify-center mb-2 mt-6 sm:mt-8">
          <button
            type="button"
            className={fullbtn}
            onClick={() => {
              navigate("/offers");
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
      <div className="bg-red-500 h-96 "></div>
    </div>
  );
};
// border-2 border-red-50
