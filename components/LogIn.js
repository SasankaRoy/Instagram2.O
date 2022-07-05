import React from "react";
import { useSession, signIn } from "next-auth/react";

export const LogIn = () => {
  return (
    <>
      <div
        className="flex flex-col
       bg-white  border-2 shadow-md
       items-center rounded-2xl mt-10
       justify-center w-[100%] md:w-[85%]
       min-h-[70%]  m-auto "
      >
        <img
          src="https://links.papareact.com/ocw"
          className="object-contain w-80"
          alt="Instagram 2.O"
        />
        <div className="flex flex-col justify-center items-center w-[90%]  ">
          <input
            type="text"
            placeholder="Email,phone number..."
            className=" h-9 w-[95%] my-5
             md:w-[55%] font-semibold
              bg-gray-50  block pl-2
             md:pl-12 sm:text-sm
             border-gray-400
              rounded-lg focus:ring-black
               focus:border-black"
          />
          <input
            type="text"
            placeholder="password..."
            className=" h-9 w-[95%] md:w-[55%]
            bg-gray-50 font-semibold  block
              pl-2 md:pl-12 sm:text-sm
            border-gray-400 rounded-lg
            focus:ring-black
            focus:border-black"
          />
          <button
            className="mt-3
           hover:bg-blue-500
            transition-all
            duration-300 ease-in-out
          hover:text-white
            border-2 text-xl
          text-blue-500
            font-semibold
            px-6 py-2
            rounded-xl"
          >
            Log In
          </button>
        </div>
        <div className="mt-4 ">
          <h2 className="font-semibold text-md text-gray-500">
            Create new account{" "}
            <span
              onClick={signIn}
              className="text-xl text-blue-400 font-[500] hover:text-blue-600 hover:border-blue-500 cursor-pointer border-b-2 px-1 border-blue-400"
            >
              {" "}
              Sign In
            </span>{" "}
          </h2>
        </div>
      </div>
    </>
  );
};
