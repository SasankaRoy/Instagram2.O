import React, { useEffect, useState } from "react";

import { Story } from "./Story";
import * as faker from "@faker-js/faker";

export const Stories = () => {
  const [fakeData, setFakeData] = useState([typeof window === "undefined"]);

  useEffect(() => {
    const fakeUsers = [...Array(20)].map((curr, index) => ({
      Name: faker.faker.name.findName(),
      image: faker.faker.image.avatar(),
      id: index,
    }));
    setFakeData(fakeUsers);
  }, []);
  return (
    <>
      <div
        className="flex space-x-3 mx-auto
        overflow-auto scrollbar-thin
        scrollbar-thumb-black scroll-smooth
        border-gray-300 border
          rounded-sm bg-white p-7 mt-3"
      >
        {fakeData.map((curr, i) => (
          <Story key={i} img={curr.image} name={curr.Name} />
        ))}
      </div>
    </>
  );
};
