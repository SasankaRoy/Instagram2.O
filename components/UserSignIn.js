import React from "react";
import {signIn} from 'next-auth/react';

export const UserSignIn = () => {
  return (
    <>
      <div className="flex flex-col items-center  min-h-screen -mt-40 text-center justify-center">
        <img
          src="https://links.papareact.com/ocw"
          className="w-80 h-40 object-contain"
          alt="Instagram Clone"
        />
        <p className="text-md py-16 italic text-gray-500 font-medium">
          <span className="text-red-500 text-3xl animate-pulse font-semibold">
            ***
          </span>
          This is not Real App, it is just a Clone of
          <span className="text-2xl text-black"> Instagram....</span>
        </p>
        <div>
          <div>
            <button
              className="p-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg "
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// export default UserSignIn
