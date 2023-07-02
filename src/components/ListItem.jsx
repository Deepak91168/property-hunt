import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
export const ListItem = ({ listing, id }) => {
  return (
    <Link
      to={`/category/${listing.type}/${id}`}
      className="border-2 border-red-500/300 rounded-xl shadow-md"
    >
      <div className="flex justify-center">
        <img className="w-full" src={logo} alt="" />
      </div>
      <hr className="mx-2 bg-[#c40c1c] h-[2px]"></hr>
      <div className="p-2 ">
        <div className="pt-2">
          <span className="font-bold">Name</span>
          <div className="flex justify-start mb-2 pr-2">
            <p className="text-sm">09 Krishna Khana Residency </p>
          </div>
        </div>
        <div className="text-xl font-semibold text-[#c40c1c]">₹50,000</div>

        <div className=" flex flex-col mt-2">
          <p className="text-sm">Rooms</p>
          <div className="flex justify-between">
            <div className="flex w-[50%]">
              <div className=" flex justify-center">
                <FaBed className="text-2xl " /> <p className="px-2">4</p>
              </div>
              <div className=" flex justify-center">
                <FaBath className="text-xl" /> <p className="px-2">2</p>
              </div>
            </div>

            <div className="flex justify-end w-[50%]">
              <button>
                <IoMdCreate className=" text-xl hover:text-[#c40c1c]" />
              </button>
              <button>
                <IoMdTrash className="text-xl hover:text-[#c40c1c]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
