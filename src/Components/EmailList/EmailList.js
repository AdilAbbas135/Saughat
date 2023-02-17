import React from "react";

const EmailList = () => {
  return (
    <div className="bg-main_bg_color text-white mt-14 py-14 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-sans font-bold">Save Time & Money</h1>
      <h3 className="text-lg font-sans ">
        Sign Up and we Will send Best Deal to You
      </h3>
      <div className="my-2 w-full max-w-lg flex justify-center text-black space-x-2">
        <input className="w-2/3 rounded-md py-3 px-4" type={"email"} />
        <button className="py-2 px-4 bg-hover_color text-white font-bold rounded-md">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default EmailList;
