import { useState } from "react";
import "../styles/icon.css";
const Theme = ({ onTheme, onClickTheme }) => {
  const toggleHandler = () => {
    onClickTheme((prevTheme) => !prevTheme);
  };

  const toggleClass = onTheme ? "bg-black" : "bg-red-500";

  return (
    <button
      type="button"
      className={` ${toggleClass} fixed right-8  bottom-5 text-2xl p-4 rounded-xl transition-[transform,shadow]  duration-200 shadow-lg shadow-[rgba(0, 0, 0, 0.15) 0px 2px 8px] active:shadow-[rgba(0, 0, 0, 0.15) 0px 0px 0px] active:translate-x-[0px] active:translate-y-[2px]`}
      onClick={toggleHandler}
    >
      {onTheme ? (
        <ion-icon name="contrast-outline" class="icon"></ion-icon>
      ) : (
        <ion-icon name="moon-outline" class="icon"></ion-icon>
      )}
    </button>
  );
};

export default Theme;
