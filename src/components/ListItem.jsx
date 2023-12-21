import React, { useContext } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { motion } from "framer-motion";

// TODO: Truncate if the length of string is larger than particular limit
export const ListItem = ({ listing, id, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  // const btnTheme = theme
  //   ? "bg-white text-black hover:text-white hover:border-white focus:ring-gray-500   "
  //   : "bg-red-600  hover:text-red-700 hover:border-red-500  ";

  if (!listing) {
    return;
  }

  const color = (value1, value2) => {
    return theme ? value1 : value2;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className={`border-[2px]  shadow-lg  ${color(
        "border-gray-500 bg-black",
        "border-red-500"
      )} rounded-md `}
    >
      <div className="flex justify-center">
        <img
          className="h-36 w-full object-cover"
          src={listing.imgUrls[0]}
          alt=""
        />
      </div>
      <hr className={` ${color("border-white", "bg-[#c40c1c]")} h-[2px]`}></hr>
      <div className={`p-2 ${color(" text-white", " ")}`}>
        <div className="pt-2 ">
          <span
            className={`text-[0.9rem] font-extrabold ${color(
              "text-gray-400",
              "text-[#c40c1c]"
            )}`}
          >
            {listing.name}
          </span>
          <div className="flex justify-start mb-2 pr-2">
            <p
              className={`text-[0.8rem] ${color(
                "text-gray-200",
                "text-[#c40c1c]"
              )}`}
            >
              {listing.address}
            </p>
          </div>
        </div>
        <div
          className={`text-xl flex font-semibold ${color(
            "text-gray-400",
            "text-[#c40c1c]"
          )}`}
        >
          {"₹" +
            listing.regularPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <BiSolidOffer className="hidden" />
        </div>

        <div className="flex flex-col mt-2">
          <div className="flex justify-between items-baseline">
            <div className="flex w-[50%]">
              <div className=" flex justify-center">
                <FaBed className="text-lg " />{" "}
                <p className="px-2 text-[0.8rem]">{listing.bed}</p>
              </div>
              <div className=" flex justify-center">
                <FaBath className="text-sm" />{" "}
                <p className="px-2 text-[0.8rem]">{listing.bath}</p>
              </div>
            </div>

            <div className={`flex justify-end items-end rounded-md text-white`}>
              {onEdit && (
                <button
                  onClick={() => onEdit(listing.id)}
                  className={`rounded-full p-2  ${color(
                    "hover:bg-slate-700",
                    "hover:bg-slate-300 text-black"
                  )}`}
                >
                  <IoMdCreate type="button" className=" text-md " />
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(listing.id)}
                  className={`rounded-full p-2  ${color(
                    "hover:bg-slate-700",
                    "hover:bg-slate-300 text-black"
                  )}`}
                >
                  <IoMdTrash type="button" className="text-md" />
                </button>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center text-sm mt-2">
            <button
              onClick={() => {
                navigate(`/category/${listing.type}/${id}`);
              }}
              className={` w-full px-4 p-2 rounded-md text-[0.8rem] hover:text-white ${color(
                "bg-gray-600",
                "bg-red-500"
              )} `}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
