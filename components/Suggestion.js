import React, { useEffect, useState } from "react";
import * as faker from "@faker-js/faker";

const dummyData = [
  {
    id: 1,
    userName: "Sasanka",
    userLogo: "./photo2.jpg",
    userImage: "./photo1.jpg",
    caption: "Instagram clone or Instagram 2.O. Having fun with it",
  },
  {
    id: 2,
    userName: "Sasanka",
    userLogo: "./photo3.jpg",
    userImage: "./photo4.jpg",
    caption: "Instagram clone or Instagram 2.O. Having fun with it",
  },
];

export const Suggestion = () => {
  const [fakeData, setFakeData] = useState([typeof window === "undefined"]);
  useEffect(() => {
    let data = [...Array(6)].map((cur, index) => ({
      Name: faker.faker.name.findName(),
      image: faker.faker.image.avatar(),
      id: index,
      DOB: faker.faker.date.birthdate(),
      company: faker.faker.company.companyName(),
    }));
    setFakeData(data);
  }, []);
  return (
    <>
      <div className="mt-2 ml-6">
        <div
          className="flex justify-between
         items-center border-b-2 mb-5"
        >
          <h3 className="text-sm text-gray-400 font-bold">
            Suggestion For You
          </h3>

          <button
            className="text-md text-gray-500 
          font-semibold  p-2  rounded-full
           hover:text-blue-400 transition-all
            duration-150 ease-out"
          >
            See All
          </button>
        </div>

        {fakeData.map((profiles, index) => (
          <div
            className="flex items-center
             cursor-pointer  rounded-md
              justify-between mt-4"
            key={index}
          >
            <img
              src={profiles.image}
              alt="users"
              className="h-14 w-14 border
               border-gray-400 p-[1.5px]
                rounded-full "
            />

            <div className="flex-1 ml-4">
              <h2 className="text-lg font-bold text-gray-700">
                {profiles.Name}
              </h2>
              <h3 className="text-sm truncate text-gray-500">
                Work At {profiles.company}
              </h3>
            </div>
            <button className="text-blue-400 text-lg font-semibold">
              Follow
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
