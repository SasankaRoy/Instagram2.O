import React, { useEffect, useState } from "react";
import * as faker from "@faker-js/faker";
import { useSession,signOut } from "next-auth/react";

export const Miniprofile = () => {
  const { data: session } = useSession();

  const [fakeData, setFakeData] = useState([""]);
  useEffect(() => {
    const data = [...Array(1)].map((cur, index) => ({
      userName: faker.faker.name.findName(),
      avatar: faker.faker.image.avatar(),
    }));
    setFakeData(data);
  }, []);

  
  return (
    <>
      <div
        className="flex items-center
        justify-between -mt-14 ml-4"
      >
        <img
          src={session?.user?.image} //  faker.faker.name.findName()
          alt="userlogo"
          className="rounded-full
           border p-[2px]  h-20 w-20 "
        />
        <div className="truncate  flex-1 mx-6">
          <h2 className="font-semibold text-lg   ">{session?.user?.name}</h2>
          <h3
            className="font-normal
           text-sm  text-gray-400"
          >
            I am a Software Developer
          </h3>
        </div>
        <button
          className="font-semibold
         text-md text-blue-300" onClick={signOut}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};
