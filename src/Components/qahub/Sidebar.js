import { Button } from "@material-tailwind/react";
import React from "react";
import { AiFillTag } from "react-icons/ai";

const Sidebar = () => {
  const topics = [
    "Physics",
    "chemistry",
    "Math",
    "English",
    "Urdu",
    "Programming",
    "computer",
    "Analytics",
    "Machine Learning",
  ];
  return (
    <>
      <div className="pb-3 border-b">
        <Button className="w-full rounded-sm py-2 bg-hover_color hover:bg-main_bg_color shadow-none hover:shadow-none">
          Ask A Question
        </Button>
      </div>
      <div className="mt-5">
        <h1 className="flex items-center font-bold text-xl">
          {<AiFillTag size={25} className="mr-2" />} Relevent Tags
        </h1>
        <div className="mt-2 flex flex-wrap items-center space-x-2 space-y-2 overflow-hidden ">
          {/* eslint-disable-next-line */}
          <h1></h1>
          {topics.map((elem, index) => {
            return (
              <h1
                key={index}
                className="bg-gray-100 px-3 py-1 hover:text-white hover:bg-hover_color transition-all cursor-pointer"
              >
                {elem}
              </h1>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
