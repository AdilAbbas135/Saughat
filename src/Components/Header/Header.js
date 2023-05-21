import { MdLocationOn } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { HiBookOpen } from "react-icons/hi";

import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
  return (
    <div
      className={page === "home" ? "HeaderNavContainer" : "bg-main_bg_color"}
    >
      <Navbar />
      {page === "home" && (
        <div className=" Header z-[2]  text-white flex justify-center pt-5 pb-16 ">
          <div className="header-container w-full max-w-6xl px-5 lg:px-0">
            <div className="mt-10 pb-5 relative">
              <div className="max-w-4xl">
                <h1 className="mb-5 text-7xl font-bold font-sans leading-[1.2] uppercase text-search_color">
                  Saughaat
                </h1>
                <p className="text-lg ">
                  A place where scheduling events are few clicks away
                </p>
              </div>
              {/* <div
                className={`headerSearch hidden  z-[2] h-16 bg-white md:flex items-center text-black justify-around rounded-md absolute -bottom-24 w-full`}
              >
                <div className="flex items-center space-x-2">
                  <MdLocationOn className="text-2xl text-gray-400" />

                  <input type={"text"} placeholder="Select District" />
                </div>
                <div className="flex items-center space-x-2">
                  <FaCity className="text-2xl text-gray-400" />
                  <input type={"text"} placeholder="Select City" />
                </div>
                <div className="flex items-center space-x-2">
                  <HiBookOpen className="text-2xl text-gray-400" />
                  <input type={"text"} placeholder="Select Subjects" />
                </div>

                <Link to={"/SearchTeacher"}>
                  <button className=" py-2 px-7 bg-main_bg_color text-white font-semibold rounded-md">
                    Search
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
