import React from "react";
import Image from "next/image";

export const Story = ({ img, name }) => {
  return (
    <div>
      <img
        src={img}
        className="rounded-full w-20 h-20
          border-red-500 border-2 p-[1.5px] object-contain
           cursor-pointer  hover:scale-125 transition transform
            duration-150 ease-in"
      />
      <p
        className=" w-20 h-20 text-center
       text-md truncate"
      >
        {name}
      </p>
    </div>
  );
};
