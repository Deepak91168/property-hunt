import "../styles/icon.css";
import {toast} from 'react-toastify';
const Theme = ({ onTheme, onClickTheme, }) => {
  const toggleHandler = () => {
    if(onTheme === false){
      toast.warn("We are still working towards adding the dark mode to every page");
    }
    onClickTheme((prevTheme) => !prevTheme);
  };


  const toggleClass = onTheme ? "bg-black" : "bg-red-500";

  return (
    <button
      type="button"
      aria-label="Change-theme"
      className={` ${toggleClass} fixed right-4 flex justify-center items-center bottom-14 text-sm sm:text-md p-4 rounded-full transition-[transform,shadow]  duration-200 shadow-lg shadow-[rgba(0, 0, 0, 0.15) 0px 2px 8px] active:shadow-[rgba(0, 0, 0, 0.15) 0px 0px 0px] active:translate-x-[0px] active:translate-y-[2px]`}
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
