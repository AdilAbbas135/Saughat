import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import React from "react";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/qahub/Sidebar";
import { BsFillReplyFill } from "react-icons/bs";

const SingleDiscussion = () => {
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
      <Header page={"singlequestion"} />
      <div className="my-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <div className="mt-5 grid grid-cols-10 gap-x-3">
          <div className="col-span-7 border-2 border-gray-200 bg-white p-5 rounded-sm">
            <div className=" py-5">
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
                  <div className="my-3 bg-gray-100 p-5 flex items-center justify-between">
                    <div className=" flex items-center space-x-3">
                      <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                        <MdOutlineQuestionAnswer className="text-hover_color mr-1" />
                        <p>10 Answers</p>
                      </div>
                      <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                        <AiOutlineEye className="text-hover_color mr-1" />
                        <p>100 views</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h1 className=" text-xl font-bold text-text_color capitalize">
                  Leave Your Answer
                </h1>
                <div className="mt-3 flex items-center space-x-2">
                  <img
                    src="/assets/user.png"
                    alt=""
                    className="h-[50px] w-[50px] rounded-full border-2 border-gray-300 p-[2px]"
                  />
                  <div className="w-full">
                    <form>
                      <div className="flex items-center space-x-2">
                        <TextField
                          id="standard-basic"
                          label="Post Your Answer"
                          variant="standard"
                          className="w-full"
                        />
                        <Button className="bg-transparent border-2 border-hover_color text-hover_color transition-all hover:bg-hover_color hover:text-white px-10 py-2 rounded-sm shadow-none hover:shadow-none">
                          Post
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 bg-gray-100 py-3">
                <h1 className="px-5 rounded-sm text-xl font-bold text-text_color_secondary capitalize">
                  5 Answers
                </h1>
              </div>
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
                            <div className="bg-white w-fit px-3 py-1 flex items-center rounded-sm">
                              <BiUpArrow
                                size={18}
                                className="text-hover_color mr-1 cursor-pointer hover:scale-105 transition-all"
                              />
                              <p>15</p>
                              <BiDownArrow
                                size={18}
                                className="ml-1 text-hover_color cursor-pointer hover:scale-105 transition-all"
                              />
                            </div>
                          </div>
                          {/* <div className="flex items-center space-x-2">
                            <Button
                              variant="text"
                              className="px-7 text-hover_color flex items-center  rounded-sm py-2 shadow-none hover:shadow-none"
                            >
                              <BsFillReplyFill className="mr-1" /> Reply
                            </Button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-3 border-2 border-gray-200 bg-white p-5 runded-sm h-fit">
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleDiscussion;
