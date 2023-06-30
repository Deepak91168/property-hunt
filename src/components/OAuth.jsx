import React from "react";
import {FcGoogle} from 'react-icons/fc'
export const OAuth = () => {
  return (
    <button
      type="button"
      className="mt-3 w-full flex justify-center items-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      <FcGoogle className="text-xl mr-2"/>
       Continue with Google
    </button>
  );
};
