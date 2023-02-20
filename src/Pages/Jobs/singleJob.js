import { Button } from "@material-tailwind/react";
import { Tooltip } from "@mui/material";
import React from "react";
import {
  AiOutlineEye,
  AiOutlineFieldTime,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import { BsCashCoin, BsChatLeftText, BsGenderAmbiguous } from "react-icons/bs";
import { FaBuromobelexperte } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { RiPenNibFill } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/qahub/Sidebar";

const SingleJob = () => {
  const insights = [
    {
      icon: <MdDateRange size={25} />,
      text: "Date Posted",
      Data: "2022-12-08",
    },
    {
      icon: <MdDateRange size={25} />,
      text: "Closing Date",
      Data: "2023-02-08",
    },
    {
      icon: <HiOutlineLocationMarker size={25} />,
      text: "Hiring Location",
      Data: "Gujrat",
    },
    {
      icon: <BsCashCoin size={25} />,
      text: "Offered salary",
      Data: "Rs. 50-40k/per Month",
    },
    {
      icon: <BiMedal size={25} />,
      text: "Qualification",
      Data: "Bachelor Degree",
    },
    {
      icon: <FaBuromobelexperte size={25} />,
      text: "Experience",
      Data: "3-5 Years",
    },
    {
      icon: <BsGenderAmbiguous size={25} />,
      text: "Gender",
      Data: "Male",
    },
  ];

  return (
    <>
      <div className="bg-gray-100 pb-10">
        <Header page="qahub" />
        <div className="mt-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
          <div className="grid grid-cols-10 gap-x-3">
            <div className="col-span-7 border-2 border-gray-200 bg-white  rounded-md">
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
                        Sr. Backend Go Developer
                      </h1>
                      <p className="mt-2 bg-[rgba(0,116,86,.05)] font-semibold text-hover_color w-fit flex items-center px-2 py-1 rounded-lg">
                        <HiOutlineLocationMarker size={18} className="mr-1" />{" "}
                        Gujrat
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="cursor-pointer">
                      <Tooltip title="Share" placement="bottom">
                        <AiOutlineShareAlt
                          size={25}
                          className="text-hover_color"
                        />
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer">
                      <Tooltip title="Share" placement="bottom">
                        <AiOutlineHeart
                          size={25}
                          className="text-hover_color"
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h1 className="text-2xl font-semibold text-text_color transition-all cursor-pointer capitalize">
                    Job role insights
                  </h1>
                  <div className="mt-5 grid grid-cols-3 gap-7 pb-5 border-b">
                    {insights.map((elem, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <p className="p-3 bg-[rgba(0,116,86,.05)] font-semibold text-hover_color w-fit flex items-center justify-center rounded-full">
                            {elem.icon}
                          </p>
                          <div>
                            <h1 className="text-[16px] font-semibold text-text_color hover:text-hover_color transition-all capitalize">
                              {elem.text}
                            </h1>
                            <p className="text-[16px]  text-text_color_secondary_2 opacity-90 hover:text-hover_color transition-all capitalize">
                              {elem.Data}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 flex flex-col space-y-3">
                    <h1 className="text-2xl font-semibold text-text_color transition-all cursor-pointer capitalize">
                      Description
                    </h1>
                    <h1 className="text-lg font-semibold text-text_color transition-all cursor-pointer capitalize">
                      Overview
                    </h1>
                    <p className="text-text_color_secondary_2">
                      We are Uxper. With a presence in more than 60 countries,
                      we’re a growing global organization that helps amazing
                      companies engage with customers through mobile messaging,
                      email, voice and video.
                    </p>
                    <h1 className="text-lg font-semibold text-text_color transition-all cursor-pointer capitalize">
                      Requirements
                    </h1>
                    <p>
                      Be heavily involved in turning user stories into testable,
                      maintainable and high-quality code. This is a hands-on
                      code design and coding role! Be a valued member of an
                      autonomous, cross-functional team delivering our messaging
                      experience to businesses around the world Promote and
                      share knowledge for improvement of methodologies and best
                      practices Close-knitted collaboration with equally
                      passionate team members having fun at work and feeling
                      proud that you are a key part of creating world-class
                      solutions for customer engagement
                    </p>
                    <h1 className="text-lg font-semibold text-text_color transition-all cursor-pointer capitalize">
                      Skill & Experience
                    </h1>
                    <p>
                      You have at least 3 years of experience working as a
                      Product Designer. You have experience using Sketch and
                      InVision or Framer X You have some previous experience
                      working in an agile environment – Think two-week sprints.
                      You are familiar with using Jira and Confluence in your
                      workflow
                    </p>
                  </div>
                  <Button className="mt-5 w-full rounded-md bg-hover_color shadow-none hover:shadow-none">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-3 sticky top-0 left-0 border-2 border-gray-200 bg-white px-5 py-5 pb-10 rounded-md h-fit">
              <>
                <div className="pb-3 border-b">
                  <Button className="w-full rounded-sm py-2 bg-hover_color hover:bg-main_bg_color shadow-none hover:shadow-none">
                    Apply Now
                  </Button>
                </div>
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

export default SingleJob;
