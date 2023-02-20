import { Button } from "@material-tailwind/react";
import React from "react";
import { AiFillStar, AiOutlineFieldTime, AiOutlinePlus } from "react-icons/ai";
import { BsCashCoin, BsChatLeftText } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const SingleInstitute = () => {
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
  ];

  return (
    <>
      <div className="bg-gray-100 pb-10">
        <Header page="qahub" />
        <div className="mt-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
          <div className="grid grid-cols-10 gap-x-3">
            <div className="col-span-7 border-2 border-gray-200 bg-white rounded-md">
              <div className="h-[250px]">
                <img
                  src="/assets/company-14-770x250.webp"
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="py-10 px-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/assets/webflow-logo.webp"
                      className="h-[60px] w-[60px] object-cover rounded-full"
                      alt=""
                    />
                    <div>
                      <h1 className="text-2xl font-semibold text-text_color hover:text-hover_color transition-all cursor-pointer capitalize">
                        Webflow
                      </h1>
                      <div className="flex items-center space-x-2 mt-2">
                        <p className=" bg-[rgba(0,116,86,.05)] font-semibold text-hover_color w-fit flex items-center px-2 py-1 rounded-lg">
                          <HiOutlineLocationMarker size={18} className="mr-1" />{" "}
                          Gujrat
                        </p>
                        <p className="bg-[rgba(0,116,86,.05)] font-semibold text-hover_color w-fit flex items-center px-4 py-1 rounded-md">
                          <AiFillStar size={18} className="mr-1" />
                          3.2
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        variant="outlined"
                        className="flex items-center justify-center px-3 py-2 text-sm rounded-full text-text_color_secondary_2 hover:text-hover_color transition-all hover:border-hover_color"
                      >
                        <AiOutlinePlus className="mr-2" /> Follow
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        variant="outlined"
                        className="flex items-center justify-center px-3 py-2 text-sm rounded-full text-text_color_secondary_2 hover:text-hover_color transition-all hover:border-hover_color"
                      >
                        <BsChatLeftText className="mr-2" /> Message
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        variant="outlined"
                        className="flex items-center justify-center px-3 py-2 text-sm rounded-full text-text_color_secondary_2 hover:text-hover_color transition-all hover:border-hover_color"
                      >
                        <BsChatLeftText className="mr-2" /> Website
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-10 ">
                  <div className="mt-5 flex flex-col space-y-3 pb-5 border-b">
                    <h1 className="text-2xl font-semibold text-text_color transition-all cursor-pointer capitalize">
                      Overview
                    </h1>
                    <p className="text-text_color_secondary_2">
                      Uxper is the first design and hosting platform built from
                      the ground up for the mobile age. It is the only hosted
                      service that allows designers to create websites that work
                      on every device, and push it live to production without a
                      developer. Uxper empowers designers to create beautiful,
                      responsive websites—without writing a single line of code,
                      or relying on a developer. Its drag-and-drop interface
                      looks, feels, and works like familiar desktop design
                      tools, and writes clean, semantic code any developer would
                      be proud of. Get started today—for free—but brace
                      yourself: your workflow’s about to be transformed.
                    </p>
                  </div>
                  <div className="mt-5 pb-5 border-b">
                    <h1 className="text-2xl font-semibold text-text_color transition-all cursor-pointer capitalize">
                      Photos
                    </h1>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <img
                        src="/assets/cover-005-scaled.webp"
                        className="h-[250px] object-cover rounded-md"
                        alt=""
                      />
                      <img
                        src="/assets/cover-005-scaled.webp"
                        className="h-[250px] object-cover rounded-md"
                        alt=""
                      />
                      <img
                        src="/assets/cover-005-scaled.webp"
                        className="h-[250px] object-cover rounded-md"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-5 pb-5 border-b">
                    <h1 className="text-2xl font-semibold text-text_color transition-all cursor-pointer capitalize">
                      Jobs at Webflow
                    </h1>
                    {questions.map((question, index) => {
                      return (
                        <div key={index} className="border-b py-5">
                          <div className="qaheader flex space-x-3">
                            <img
                              src={question.profilepicture}
                              alt=""
                              className="h-[45px] w-[45px] rounded-full border-2 border-gray-300 p-[2px]"
                            />
                            <div className="w-full">
                              <div className="w-full flex items-center justify-between">
                                <Link to={"/jobs/12345"}>
                                  <h1 className="text-3xl font-bold text-text_color hover:text-hover_color transition-all cursor-pointer capitalize">
                                    {question.question}
                                  </h1>
                                </Link>
                                <p className="flex items-center text-sm text-text_color_secondary_2">
                                  <AiOutlineFieldTime
                                    size={20}
                                    className="mr-1 text-hover_color"
                                  />
                                  {question.datePosted}
                                </p>
                              </div>
                              <p className="mt-2">
                                {question.desc.length > 100 ? (
                                  <p>
                                    {question.desc.substring(0, 100)}...{" "}
                                    <Link
                                      to={"/jobs/12345"}
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
                                  <BsCashCoin size={18} className="mr-1" />
                                  {question.Salary}
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
            <div className="col-span-3 sticky top-0 left-0 border-2 border-gray-200 bg-white px-5 py-5 pb-10 rounded-md h-fit">
              <>
                <div className="mt-5">
                  <div className="flex items-center space-x-4">
                    <img
                      src="/assets/webflow-logo.webp"
                      className="h-[60px] w-[60px] object-cover rounded-full"
                      alt=""
                    />
                    <div>
                      <h1 className="text-xl font-bold text-text_color hover:text-hover_color transition-all cursor-pointer capitalize">
                        WIX
                      </h1>
                      <Button
                        variant="text"
                        className="font-semibold py-0 text-hover_color"
                      >
                        View Company Profile
                      </Button>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col space-y-3">
                    <Button
                      variant="outlined"
                      className="flex items-center justify-center w-full rounded-full"
                    >
                      Visit wix.com <FiExternalLink className="ml-2" />
                    </Button>
                    <Button
                      variant="outlined"
                      className="flex items-center justify-center w-full rounded-full text-hover_color border-hover_color"
                    >
                      Send Message <BsChatLeftText className="ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleInstitute;
