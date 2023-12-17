import { InfinitySpin } from "react-loader-spinner";
export const Loader = () => {
  return (
    <div className="flex right-[1/2] h-screen bg-transparent absolute text-center w-full top-0 justify-center items-center z-40">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};
//TODO: Add Different Loader
