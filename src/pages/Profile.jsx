import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const onSignout = (e) => {
    e.preventDefault();
    auth.signOut();
    navigate("/");
  };
  async function onEditsubmit() {
    try {
      //auth
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated!");
    } catch (error) {
      console.log(error);
      toast.error("Could not make changes to profile!");
    }
  }
  const onEditprofile = (e) => {
    if (edit) {
      onEditsubmit();
    }
    setEdit((prev) => !prev);
    e.preventDefault();
  };
  const onInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-24 w-24"
      viewBox="0 0 20 20"
      fill="white"
    >
      <path
        fill-rule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clip-rule="evenodd"
      />
    </svg>
  );
  return (
    <section className="px-4 py-6 max-w-6xl mx-auto ">
      <div className="p-8 bg-white shadow-xl mt-24 border-[0.5px] border-red-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-1 text-center order-last md:order-first"></div>
          <div className="relative">
            <div className="w-48 h-48 bg-[#c40c1c] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {svg}
            </div>
          </div>
        </div>
        <form>
          <div className="mb-6 mt-32">
            <div className=" max-w-xl m-auto text-center border-b-[1px] border-red-500/30">
              <input
                type="text"
                id="name"
                disabled={!edit}
                value={name}
                onChange={onInputChange}
                className={`text-3xl p-2 ${
                  edit &&
                  "bg-red-100 focus:bg-red-200 focus:border-red-400 rounded-md"
                } text-center font-medium text-gray-700 focus:border-[#c40c1c] focus:outline-none focus:ring-2 focus:ring-[#c40c1c]`}
              />
              <input
                type="email"
                id="email"
                disabled={!edit}
                value={email}
                onChange={onInputChange}
                className={`font-light p-2 ${
                  edit &&
                  "bg-red-200 focus:bg-red-200 focus:border-red-400 rounded-md"
                } text-center text-gray-600 mt-3 mb-6 focus:border-[#c40c1c] focus:outline-none focus:ring-2 focus:ring-[#c40c1c]`}
              />
            </div>
          </div>

          <div className="max-w-md m-auto space-x-8 flex justify-center items-center md:justify-center ">
            <button
              type="text"
              onClick={onEditprofile}
              className=" w-full flex justify-center items-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {edit ? "Apply Changes" : "Edit"}
            </button>
            <button
              type="submit"
              onClick={onSignout}
              className=" w-full flex justify-center items-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </form>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
            Show more
          </button>
        </div>
      </div>
    </section>
  );
};