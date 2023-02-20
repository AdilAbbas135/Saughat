import React from "react";
import { AiFillStar, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { HiBookOpen, HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdLocate } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/institute/Sidebar";
import { Button } from "@material-tailwind/react";

const Institute = () => {
  const questions = [
    {
      profilepicture: "/assets/webflow-logo.webp",
      name: "adil abbas",
      datePosted: "29 april, 2020",
      question: "Webflow",
      location: "Gujrat",
      Salary: "90k",
      rating: 3.2,
      desc: "We are Uxper. With a presence in more than 60 countries, we’re a growing global organization that helps amazing companies engage with customers through mobile messaging, email, voice and video.",
    },
    {
      profilepicture: "/assets/nightfall-logo.webp",
      name: "adil abbas",
      datePosted: "29 april, 2020",
      question: "NightFall",
      location: "Phalia",
      Salary: "50k",
      rating: 2,
      desc: "We are Uxper. With a presence in more than 60 countries, we’re a growing global organization that helps amazing companies engage with customers through mobile messaging, email, voice and video.",
    },
    {
      profilepicture: "/assets/descript-logo.webp",
      name: "usama mumtaz",
      datePosted: "10 august, 2020",
      question: "Descript",
      location: "Gujrat",
      Salary: "80k",
      rating: 4.5,
      desc: "We are Uxper. With a presence in more than 60 countries, we’re a growing global organization that helps amazing companies engage with customers through mobile messaging, email, voice and video.",
    },
    {
      profilepicture: "/assets/mercury-logo.webp",
      name: "Rehmana Tallat",
      datePosted: "29 april, 2020",
      question: "Mercury",
      location: "Jehlum",
      Salary: "90k",
      rating: 3,
      desc: "We are Uxper. With a presence in more than 60 countries, we’re a growing global organization that helps amazing companies engage with customers through mobile messaging, email, voice and video.",
    },
    {
      profilepicture: "/assets/superside-logo.webp",
      name: "Ustaad g",
      datePosted: "29 april, 2022",
      question: "Business Development Manager",
      location: "Gujrat",
      Salary: "90k",
      rating: 1,
      desc: "We are Uxper. With a presence in more than 60 countries, we’re a growing global organization that helps amazing companies engage with customers through mobile messaging, email, voice and video.",
    },
  ];
  return (
    <div className="bg-gray-100">
      <Header page="jobs" />
      <div className="pb-10">
        <div className="w-full mx-auto max-w-7xl pb-10 rounded-b-md">
          <div className="mt-10">
            <h1 className="text-2xl font-bold leading-6 text-gray-900 border-l-4 border-hover_color pl-2">
              Companies Hiring Internationally
            </h1>
            <div
              className={`mt-5 h-16 bg-white md:flex items-center space-x-2 text-black justify-between px-5 rounded-md w-full`}
            >
              <div className="w-full flex items-center space-x-2 border-r-2">
                <AiOutlineSearch className="text-2xl text-gray-400" />
                <input
                  type={"text"}
                  placeholder="Company Title or Keywords"
                  className="w-full"
                />
              </div>
              <div className="w-full flex items-center space-x-2 border-r-2">
                <IoMdLocate className="text-2xl text-gray-400" />
                <input
                  type={"text"}
                  placeholder="Select Location"
                  className="w-full"
                />
              </div>
              <div className="w-full flex items-center space-x-2 border-r-2">
                <HiBookOpen className="text-2xl text-gray-400" />
                <input
                  type={"text"}
                  placeholder="Select Subjects"
                  className="w-full"
                />
              </div>

              <Link to={"/SearchTeacher"}>
                <button className=" py-2 px-7 bg-hover_color text-white font-semibold rounded-md">
                  Search
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-10 gap-x-3">
            <div className="col-span-3 border-2 border-gray-200 bg-white p-5 runded-sm h-fit sticky top-0 left-0">
              <Sidebar />
            </div>
            <div className="col-span-7 border-2 border-gray-200 bg-white p-5 rounded-sm">
              <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold text-text_color_secondary opacity-90 text-lg uppercase">
                  20 Institutes
                </h1>
                <div className="flex items-center">
                  <label for="options">Sort By:</label>
                  <select name="options" id="options">
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
              </div>
              {questions.map((question, index) => {
                return (
                  <div key={index} className=" relative border-b py-5">
                    <div className="qaheader flex space-x-3">
                      <img
                        src={question.profilepicture}
                        alt=""
                        className="h-[45px] w-[45px] rounded-full border-2 border-gray-300 p-[2px]"
                      />
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <Link to={"/institutes/12345"}>
                            <h1 className="text-3xl font-bold text-text_color hover:text-hover_color transition-all cursor-pointer capitalize">
                              {question.question}
                            </h1>
                          </Link>
                          <Button
                            variant="outlined"
                            className="flex items-center justify-center px-5 rounded-full text-hover_color border-hover_color hover:text-white hover:bg-hover_color transition-all"
                          >
                            <AiOutlinePlus className="mr-2" /> Follow
                          </Button>
                        </div>
                        <p className="mt-2">
                          {question.desc.length > 200 ? (
                            <p>
                              {question.desc.substring(0, 200)}...{" "}
                              <Link
                                to={"/institutes/12345"}
                                className="text-hover_color italic underline"
                              >
                                Read More
                              </Link>
                            </p>
                          ) : (
                            question.desc
                          )}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <p className="bg-[rgba(0,116,86,.05)] font-semibold text-hover_color w-fit flex items-center px-4 py-1 rounded-md">
                            <HiOutlineLocationMarker
                              size={18}
                              className="mr-1"
                            />{" "}
                            {question.location}
                          </p>

                          <p className="bg-[rgba(0,116,86,.05)] font-semibold text-hover_color w-fit flex items-center px-4 py-1 rounded-md">
                            <AiFillStar size={18} className="mr-1" />
                            {question.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institute;
