import { Button } from "@material-tailwind/react";
import React from "react";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import { RiPenNibFill } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/qahub/Sidebar";

const QAHUB = () => {
  const questions = [
    {
      profilepicture: "/assets/user.png",
      name: "adil abbas",
      datePosted: "29 april, 2020",
      question: "this is my question",
      desc: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis dicta inventore rerum recusandae fuga at aut, placeat accusantium! Repellat illum nulla earum animi numquam repudiandae debitis voluptates? Minus vel hic atque impedit voluptatum, laudantium exercitationem incidunt nobis architecto. Aspernatur dolorem non eaque, maiores est maxime quam sit. Assumenda, minus voluptatibus.",
    },
    {
      profilepicture: "/assets/user.png",
      name: "usama mumtaz",
      datePosted: "10 august, 2020",
      question: "title",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, laborum.",
    },
    {
      profilepicture: "/assets/user.png",
      name: "Rehmana Tallat",
      datePosted: "29 april, 2020",
      question: "this is my question",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, laborum.",
    },
    {
      profilepicture: "/assets/user.png",
      name: "Ustaad g",
      datePosted: "29 april, 2022",
      question: "Title is this",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, laborum.",
    },
    {
      profilepicture: "/assets/user.png",
      name: "adil abbas",
      datePosted: "29 april, 2020",
      question: "this is my question",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, laborum.",
    },
  ];

  return (
    <>
      <div className="bg-gray-100 pb-10">
        <Header page="qahub" />
        <div className="qahub-header h-[300px] flex justify-center">
          <div className="mx-auto w-full max-w-7xl flex justify-between items-center ">
            <div className="flex-1">
              <h3 className="text-3xl font-bold leading-6 text-white border-l-4 border-white pl-2">
                Q&A HUB
              </h3>
              <p className="mt-4 text-white">
                We want to connect the people who have knowledge to the people
                who need it, to bring together people with different
                perspectives so they can understand each other better, and to
                empower everyone to share their knowledge.
              </p>
            </div>
            <h3 className="flex-1 text-2xl font-semibold leading-6 text-white text-end ">
              <Link to={"/"}>Home</Link> / Q&A Hub
            </h3>
          </div>
        </div>
        <div className="mt-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
          <div className="mt-5 grid grid-cols-10 gap-x-3">
            <div className="col-span-7 border-2 border-gray-200 bg-white p-5 rounded-sm">
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
                          <h1 className="font-semibold text-sm text-text_color_secondary_2 capitalize">
                            {question.name}
                          </h1>
                          <p className="flex items-center text-sm text-text_color_secondary_2">
                            <AiOutlineFieldTime
                              size={20}
                              className="mr-1 text-hover_color"
                            />
                            {question.datePosted}
                          </p>
                        </div>
                        <Link to={"/qahub/12345"}>
                          <h1 className="text-3xl font-bold text-text_color hover:text-hover_color transition-all cursor-pointer capitalize">
                            {question.question}
                          </h1>
                        </Link>
                        <p className="mt-2">{question.desc}</p>
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
                            <Link to={"/qahub/12345"}>
                              <Button className="px-7 flex items-center  rounded-sm py-2 bg-btn_secondary hover:bg-main_bg_color shadow-none hover:shadow-none">
                                <AiOutlineEye className="mr-1" /> View
                              </Button>
                            </Link>
                            <Button className="px-7 flex items-center rounded-sm py-2 bg-hover_color hover:bg-main_bg_color shadow-none hover:shadow-none">
                              <RiPenNibFill className="mr-1" /> Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-span-3 border-2 border-gray-200 bg-white p-5 runded-sm">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QAHUB;
