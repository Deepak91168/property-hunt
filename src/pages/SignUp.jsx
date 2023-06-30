import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signinData, setsigninData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { name, email, password } = signinData;
  const OnSiginChange = (event) => {
    setsigninData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  async function onsubmit(event) {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredentials.user;
      const formDatacopy = { ...signinData };
      delete signinData.password;
      formDatacopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDatacopy);
      toast.success("Account created successfully!")
      navigate("/");
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }
  return (
    <section className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <h2 className="text-center text-3xl font-bold text-[#c40c1c] mb-6">
          Sign Up
        </h2>
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border-[1px] border-red-500/30">
          <div className="flex items-center justify-center mb-6">
            <img className="w-20 h-20" src={logo} alt="logo" />
          </div>
          <form className="space-y-6" onSubmit={onsubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  required
                  name="name"
                  type="name"
                  value={name}
                  onChange={OnSiginChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={OnSiginChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={OnSiginChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              {showPassword ? (
                <AiFillEye
                  className="cursor-pointer absolute right-2 top-9 transition duration-300 ease-in-out"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="cursor-pointer absolute right-2 top-9 transition duration-300 ease-in-out"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/singin"
                  className="font-medium text-red-500 hover:text-red-700"
                >
                  Already have an account?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Up
              </button>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
