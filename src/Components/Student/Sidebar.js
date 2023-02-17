import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiDiscussion } from "react-icons/gi";
import { ImMail } from "react-icons/im";
import { RiDashboardFill, RiLogoutCircleLine } from "react-icons/ri";
import { MdPassword, MdSettingsAccessibility } from "react-icons/md";
const links = [
  {
    title: "Dashboard",
    links: [
      { name: "Dashboard", icon: <RiDashboardFill /> },
      { name: "Profile", icon: <CgProfile /> },
      { name: "MY Questions", icon: <AiFillQuestionCircle /> },
      { name: "Discussion", icon: <GiDiscussion /> },
    ],
  },
  {
    title: "Setting",
    links: [
      { name: "Genereal", icon: <MdSettingsAccessibility /> },
      { name: "Change Password", icon: <MdPassword /> },
      { name: "Change Email", icon: <ImMail /> },
      { name: "Logout", icon: <RiLogoutCircleLine /> },
    ],
  },
];

const Sidebar = ({ showSidebar, selected, setselected }) => {
  return (
    <div
      className={`transition-all fixed top-0 left-0 bg-white border-r-[2px] border-gray-200 h-screen overflow-hidden mt-[65px] z-10 ${
        showSidebar ? "block w-[16%]" : "hidden w-[0]"
      } text-text_color_secondary pl-5 py-5`}
    >
      {links.map((link, index) => {
        return (
          <div key={index} className="mb-7">
            <h1 className="font-bold text-[16px] tracking-wider uppercase text-text_color">
              {link.title}
            </h1>
            <span className="block h-1 w-10 bg-hover_color rounded-md mt-1 mb-5"></span>
            {link.links.map((link, index) => {
              return (
                <div key={index} className="menu-item mr-4 mb-2">
                  <div
                    className={`${
                      link.name === selected && "text-hover_color"
                    } transition-all w-full flex space-x-2 py-2 pl-4 cursor-pointer items-center text-[15px] font-semibold hover:text-hover_color rounded-md `}
                    onClick={() => setselected(link.name)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <h1 className="capitalize">{link.name}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
