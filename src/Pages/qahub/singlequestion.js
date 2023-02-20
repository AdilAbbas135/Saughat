import { Button } from "@material-tailwind/react";
import React from "react";
import { AiFillTag, AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import { RiPenNibFill } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/qahub/Sidebar";

const Singlequestion = () => {
  return (
    <>
      <Header page={"singlequestion"} />
      <div className="my-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <div className="mt-5 grid grid-cols-10 gap-x-3">
          <div className="col-span-7 border-2 border-gray-200 bg-white p-5 rounded-sm">
            <div className="border-b py-5">
              <div className="qaheader flex space-x-3">
                <img
                  src="/assets/user.png"
                  alt=""
                  className="h-[45px] w-[45px] rounded-full border-2 border-gray-300 p-[2px]"
                />
                <div className="w-full">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="font-semibold text-sm text-text_color_secondary_2 capitalize">
                      adil abbas
                    </h1>
                    <p className="flex items-center text-sm text-text_color_secondary_2">
                      <AiOutlineFieldTime
                        size={20}
                        className="mr-1 text-hover_color"
                      />
                      1 hour ago
                    </p>
                  </div>
                  <h1 className="text-3xl font-bold text-text_color capitalize">
                    this is my question
                  </h1>
                  <p className="mt-2">
                    {" "}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Corporis dicta inventore rerum recusandae fuga at aut,
                    placeat accusantium! Repellat illum nulla earum animi
                    numquam repudiandae debitis voluptates? Minus vel hic atque
                    impedit voluptatum, laudantium exercitationem incidunt nobis
                    architecto. Aspernatur dolorem non eaque, maiores est maxime
                    quam sit. Assumenda, minus voluptatibus.
                  </p>
                  <div className="mt-3 bg-gray-100 p-5 flex items-center justify-between">
                    <div className=" flex items-center space-x-3">
                      <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                        <RxPerson className="text-hover_color mr-1" />
                        <p>32 people applied</p>
                      </div>
                      <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                        <AiOutlineEye className="text-hover_color mr-1" />
                        <p>100 views</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button className="px-7 flex items-center rounded-sm py-2 bg-hover_color hover:bg-main_bg_color shadow-none hover:shadow-none">
                        <RiPenNibFill className="mr-1" /> Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 border-2 border-gray-200 bg-white p-5 runded-sm">
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Singlequestion;
