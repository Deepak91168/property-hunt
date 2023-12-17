import { useLocation, useNavigate } from "react-router";
import logo from "../assets/images/logo.png";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ThemeContext from "../context/ThemeContext";
import { HiMenu } from "react-icons/hi";
export const NavBar = () => {
  //true = Sign in
  const [pageState, setPageState] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [mobileView, setMobileView] = useState(false);

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

  const NavBg = theme ? "bg-black" : "bg-white";
  const navIconTextColor = "text-[#c40c1c]";
  const applyTheme = navIconTextColor + " font-bold";

  return (
    <header className={` shadow-md sticky top-0 z-50 ${NavBg} `}>
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-6 max-w-6xl mx-auto">
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-6 sm:h-8 cursor-pointer" alt="logo" />
          <h3
            className={`ml-4 font-bold text-sm sm:text-lg ${
              theme ? "text-white" : navIconTextColor
            } text-lg`}
          >
            Property Hunt
          </h3>
        </div>
        <div className="mt-2 sm:mt-0">
          <ul className="flex justify-center items-center space-x-6">
            <li
              className={` cursor-pointer text-sm ${
                !theme
                  ? (checkPath("/") && applyTheme) || "text-black font-bold"
                  : (checkPath("/") && applyTheme) || "text-white font-bold"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={` cursor-pointer text-sm ${
                !theme
                  ? (checkPath("/properties") && applyTheme) ||
                    "text-black font-bold"
                  : (checkPath("/properties") && applyTheme) ||
                    "text-white font-bold"
              }`}
              onClick={() => navigate("/properties")}
            >
              Properties
            </li>
            <li
              className={` cursor-pointer text-sm ${
                !theme
                  ? (checkPath("/about") && applyTheme) ||
                    "text-black font-bold"
                  : (checkPath("/about") && applyTheme) ||
                    "text-white font-bold"
              }`}
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className={` cursor-pointer text-sm  ${
                !theme
                  ? ((checkPath("/singin") || checkPath("/profile")) &&
                      applyTheme) ||
                    "text-black font-bold"
                  : ((checkPath("/singin") || checkPath("/profile")) &&
                      applyTheme) ||
                    "text-white font-bold"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState ? "Sign in" : svg}
            </li>
            {/* <li>
              <HiMenu />
            </li> */}
          </ul>
        </div>
      </div>
    </header>
  );
};
