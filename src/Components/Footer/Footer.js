import React from "react";

const Footer = () => {
  return (
    <div>
      {/* <div className="flists w-full max-w-5xl m-auto py-8 flex space-x-4 text-hover_color">
        <ul className="flist w-full">
          <li className="flist-item">Countries</li>
          <li className="flist-item">Regions</li>
          <li className="flist-item">Cities</li>
          <li className="flist-item">Districts</li>
          <li className="flist-item">Airports</li>
          <li className="flist-item">Hotels</li>
        </ul>

        <ul className="flist w-full">
          <li className="flist-item">Countries</li>
          <li className="flist-item">Regions</li>
          <li className="flist-item">Cities</li>
          <li className="flist-item">Districts</li>
          <li className="flist-item">Airports</li>
          <li className="flist-item">Hotels</li>
        </ul>

        <ul className="flist w-full">
          <li className="flist-item">Countries</li>
          <li className="flist-item">Regions</li>
          <li className="flist-item">Cities</li>
          <li className="flist-item">Districts</li>
          <li className="flist-item">Airports</li>
          <li className="flist-item">Hotels</li>
        </ul>

        <ul className="flist w-full">
          <li className="flist-item">Countries</li>
          <li className="flist-item">Regions</li>
          <li className="flist-item">Cities</li>
          <li className="flist-item">Districts</li>
          <li className="flist-item">Airports</li>
          <li className="flist-item">Hotels</li>
        </ul>
      </div> */}
      <div className="copyright bg-main_bg_color py-2 text-white flex justify-between px-8">
        <span className="text-center md:text-left">
          copyright @TeachersHub.com 2022
        </span>
        <span className="hidden md:block">
          Developed By{" "}
          <a
            href="https://devadil.netlify.app/"
            target={"_blank"}
            rel="noreferrer"
            className="font-bold"
          >
            Dev. Adil
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
