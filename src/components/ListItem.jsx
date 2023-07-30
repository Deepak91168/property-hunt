import React, { useContext } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
// to={`/category/${listing.type}/${id}`}

// TODO: Truncate if the length of string is larger than particular limit
export const ListItem = ({ listing, id, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const btnTheme = theme
    ? "bg-white text-black hover:text-white hover:border-white focus:ring-gray-500   "
    : "bg-red-600  hover:text-red-700 hover:border-red-500  ";

  const fullbtn =
    btnTheme +
    " w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-md font-medium hover:bg-transparent   hover:border-2  focus:outline-none transition-all focus:ring-2 focus:ring-offset-2 ";
  if (!listing) {
    return;
  }

  const color = (value1, value2) => {
    return theme ? value1 : value2;
  };

  return (
    <div
      className={`border-[1px]  ${color(
        "border-white shadow-white",
        "border-red-500"
      )} rounded-md shadow-md hover:cursor-pointer`}
    >
      <div className="flex justify-center">
        <img className="h-36 pb-2" src={listing.imgUrls[0]} alt="" />
      </div>
      <hr
        className={`mx-2 ${color("border-white", "bg-[#c40c1c]")} h-[2px]`}
      ></hr>
      <div className={`p-2 ${color(" text-white", " ")}`}>
        <div className="pt-2">
          <span className="font-bold">{listing.name}</span>
          <div className="flex justify-start mb-2 pr-2">
            <p className="text-sm">{listing.address}</p>
          </div>
        </div>
        <div
          className={`text-2xl flex font-semibold ${color(
            "text-white",
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
          <p className="text-sm ">Rooms</p>
          <div className="flex justify-between items-baseline">
            <div className="flex w-[50%]">
              <div className=" flex justify-center">
                <FaBed className="text-2xl " />{" "}
                <p className="px-2">{listing.bed}</p>
              </div>
              <div className=" flex justify-center">
                <FaBath className="text-xl" />{" "}
                <p className="px-2">{listing.bath}</p>
              </div>
            </div>

            <div className="flex justify-end items-end w-[50%]">
              {onEdit && (
                <button>
                  <IoMdCreate
                    type="button"
                    onClick={() => onEdit(listing.id)}
                    className=" text-xl hover:text-[#c40c1c]"
                  />
                </button>
              )}

              {onDelete && (
                <button>
                  <IoMdTrash
                    type="button"
                    onClick={() => onDelete(listing.id)}
                    className="text-xl hover:text-[#c40c1c]"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end mt-3">
            <button
              onClick={() => {
                navigate(`/category/${listing.type}/${id}`);
              }}
              className={fullbtn}
            >
              More Detailes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
