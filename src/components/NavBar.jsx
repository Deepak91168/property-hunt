import { useLocation, useNavigate } from "react-router";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// #c40c1c
export const NavBar = () => {
  //true = Sign in
  const [pageState, setPageState] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
  const auth = getAuth();
  const svg = (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="#c40c1c"
    >
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
    </svg>
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState(false);
      } else {
        setPageState(true);
      }
    });
  }, [auth]);
  const checkPath = (currentRoute) => {
    return currentRoute === pathUrl;
  };
  return (
    <header className="border-b-[1px] shadow-md sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center px-4 py-6 max-w-6xl mx-auto">
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-8 cursor-pointer" alt="logo" />
          <h3 className="ml-4 font-bold text-[#c40c1c] text-lg">
            Property Hunt
          </h3>
        </div>
        <div>
          <ul className="flex justify-center items-center space-x-6">
            <li
              className={` cursor-pointer ${
                checkPath("/") && " text-[#c40c1c] font-bold "
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={` cursor-pointer ${
                checkPath("/offers") && " text-[#c40c1c] font-bold "
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={` cursor-pointer  ${
                (checkPath("/singin") || checkPath("/profile")) &&
                "text-[#c40c1c] font-bold "
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState ? "Sign in" : svg}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
