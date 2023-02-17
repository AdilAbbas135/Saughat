import React from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const SendEmail = () => {
  return (
    <>
      {/* <Head>
        <title>Verification email sent- TeachersHub</title>
        <meta name="description" content="Find the Best Teachers Near You" />
      </Head> */}
      <div
        className={`LoginWrapper h-screen w-screen overflow-hidden flex items-center justify-center`}
      >
        <div className="flex min-h-full items-center justify-center py-12 px-2 sm:px-6 lg:px-8">
          <div className="w-[calc(100vw-20px)] md:w-[800px] bg-white py-8 md:px-5 rounded-md text-center">
            <MdVerified size={65} className="mx-auto text-green-600" />
            <h1 className="mt-3 text-xl text-black text-center">
              Verification Link has been sent to your Email Address kindly
              confirm your email if you have not recieved yet{" "}
              <span className="text-main_bg_color font-bold italic underline">
                Resend Verification Mail
              </span>
            </h1>
            <div className="mt-3">
              <Link to={"/"} className=" text-main_bg_color font-bold text-xl ">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
