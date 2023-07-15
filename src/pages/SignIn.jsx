import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components/OAuth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
export const SignIn = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signinData, setsigninData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signinData;
  const OnSiginChange = (event) => {
    setsigninData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  useEffect(() => {
    console.log(token);
  }, [token]);

  async function onsubmit(event) {
    event.preventDefault();
    console.log("Try ke bhar");
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("LOL");
      if (userCredentials.user) {
        setToken("This is a token");
        navigate("/");
      }
    } catch (error) {
      toast.error("Wrong Password!");
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <h2 className="text-center text-3xl font-bold text-[#c40c1c] mb-6">
          Sign In
        </h2>
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border-[1px] border-red-500/30">
          <div className="flex items-center justify-center mb-6">
            <img className="w-20 h-20" src={logo} alt="logo" />
          </div>
          <form className="space-y-6" onSubmit={onsubmit}>
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
                  autoComplete="email"
                  required
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
                  to="/forgetpassword"
                  className="font-medium text-red-500 hover:text-red-700"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="text-sm">
                <Link
                  to="/singup"
                  className="font-medium text-red-500 hover:text-red-700"
                >
                  Create new account
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign in
              </button>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
