import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// to={`/category/${listing.type}/${id}`}
export const ListItem = ({ listing, id, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const hollowbtn =
  "w-full flex justify-center items-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";
  const fullbtn =
  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";
  return (
    <div
      className="border-[1px] border-[#c40c1c] rounded-lg shadow-md hover:cursor-pointer"
    >
      <div className="flex justify-center">
        <img className="h-48 pb-2" src={listing.imgUrls[0]} alt="" />
      </div>
      <hr className="mx-2 bg-[#c40c1c] h-[2px]"></hr>
      <div className="p-2">
        <div className="pt-2">
          <span className="font-bold">{listing.name}</span>
          <div className="flex justify-start mb-2 pr-2">
            <p className="text-sm">{listing.address}</p>
          </div>
        </div>
        <div className="text-2xl flex font-semibold text-[#c40c1c]">
          {"₹" + +listing.regularPrice}
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
            <button onClick={() => {navigate(`/category/${listing.type}/${id}`)}} className={fullbtn} >More Detailes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
