import { useLocation, useNavigate } from "react-router";
import logo from "../assets/images/logo.png";
// text-[#c40c1c]
export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
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
                checkPath("/singin") && " text-[#c40c1c] font-bold "
              }`}
              onClick={() => navigate("/singin")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
