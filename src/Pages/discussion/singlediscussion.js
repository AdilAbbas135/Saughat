import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/qahub/Sidebar";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { createAlert } from "../../Redux/Alert";
import Loader from "../../Components/Loader";
import moment from "moment";

const SingleDiscussion = () => {
  const token = localStorage.getItem("authtoken");
  const location = useLocation();
  const dispatch = useDispatch();
  const DiscussionId = location.pathname.split("/").slice(-1);
  const [pageLoading, setpageLoading] = useState(true);
  const [Discussion, setDiscussion] = useState({});
  const [Answers, setAnswers] = useState([]);
  const [AnswerValue, setAnswerValue] = useState("");
  const [btnloading, setbtnloading] = useState(false);
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

  const FetchReplies = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/discussion/get-replies?DiscussionId=${DiscussionId}`
      )
      .then((result) => {
        console.log(result);
        setDiscussion(result.data.Discussion);
        setAnswers(result.data.Answers);
        setpageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          createAlert({
            type: "error",
            message: error?.response?.data?.error
              ? error?.response?.data?.error
              : "Something went wrong! Try again later",
          })
        );
      });
  };

  const SubmitAnswer = async () => {
    setbtnloading(true);
    const Data = { Answer: AnswerValue };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/discussion/post-reply?DiscussionId=${DiscussionId}`,
        Data,
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          createAlert({
            type: "success",
            message: "Answer Posted Successfully",
          })
        );
        setbtnloading(false);
        setAnswerValue("");
      })
      .catch((error) => {
        console.log(error);
        setbtnloading(false);
        dispatch(
          createAlert({
            type: "error",
            message: error?.response?.data?.error
              ? error?.response?.data?.error
              : "Something went wrong",
          })
        );
      });
  };
  useEffect(() => {
    FetchReplies();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {pageLoading ? (
        <Loader />
      ) : (
        <>
          <Header page={"singlequestion"} />
          <div className="my-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
            <div className="mt-5 grid grid-cols-10 gap-x-3">
              <div className="col-span-7 border-2 border-gray-200 bg-white p-5 rounded-sm">
                <div className=" py-5">
                  <div className="qaheader flex space-x-3">
                    <img
                      src={
                        Discussion?.Student[0]?.ProfilePicture
                          ? Discussion?.Student[0]?.ProfilePicture
                          : "/assets/user.png"
                      }
                      alt=""
                      className="h-[45px] w-[45px] rounded-full border-2 border-gray-300 p-[2px]"
                    />
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <h1 className="font-semibold text-sm text-text_color_secondary_2 capitalize">
                          {Discussion?.Student[0]?.FirstName +
                            " " +
                            Discussion?.Student[0]?.LastName}
                        </h1>
                        <p className="flex items-center text-sm text-text_color_secondary_2">
                          <AiOutlineFieldTime
                            size={20}
                            className="mr-1 text-hover_color"
                          />
                          {moment(Discussion?.createdAt).fromNow()}
                        </p>
                      </div>
                      <h1 className="text-3xl font-bold text-text_color capitalize">
                        {Discussion.Title}
                      </h1>
                      <p className="mt-2">
                        {Discussion.Description}
                        {/* Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corporis dicta inventore rerum recusandae fuga at
                        aut, placeat accusantium! Repellat illum nulla earum
                        animi numquam repudiandae debitis voluptates? Minus vel
                        hic atque impedit voluptatum, laudantium exercitationem
                        incidunt nobis architecto. Aspernatur dolorem non eaque,
                        maiores est maxime quam sit. Assumenda, minus
                        voluptatibus. */}
                      </p>
                      <div className="my-3 bg-gray-100 p-5 flex items-center justify-between">
                        <div className=" flex items-center space-x-3">
                          <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                            <MdOutlineQuestionAnswer className="text-hover_color mr-1" />
                            <p>{Answers.length} Answers</p>
                          </div>
                          {/* <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                            <AiOutlineEye className="text-hover_color mr-1" />
                            <p>100 views</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h1 className=" text-xl font-bold text-text_color capitalize">
                      Leave Your Answer
                    </h1>
                    {token ? (
                      <div className="mt-3 flex items-center space-x-2">
                        <img
                          src={
                            Discussion?.Student[0]?.ProfilePicture
                              ? Discussion?.Student[0]?.ProfilePicture
                              : "/assets/user.png"
                          }
                          alt=""
                          className="h-[50px] w-[50px] rounded-full border-2 border-gray-300 p-[2px]"
                        />
                        <div className="w-full">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              SubmitAnswer();
                            }}
                          >
                            <textarea
                              rows={5}
                              value={AnswerValue}
                              required
                              onChange={(e) => setAnswerValue(e.target.value)}
                              className="w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none"
                            />
                            <Button
                              type="submit"
                              disabled={btnloading ? true : false}
                              className="bg-hover_color border-2 border-hover_color text-white transition-all hover:bg-hover_color hover:text-white px-5 py-2 rounded-sm shadow-none hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {btnloading ? (
                                <CircularProgress
                                  size={18}
                                  disableShrink
                                  sx={{ color: "white" }}
                                />
                              ) : (
                                <>Post Answer</>
                              )}
                            </Button>
                            {/* <div className="flex items-center space-x-2">
                          <TextField
                            id="standard-basic"
                            label="Post Your Answer"
                            variant="outlined"
                            className="w-full"
                          />
                          <Button className="bg-transparent border-2 border-hover_color text-hover_color transition-all hover:bg-hover_color hover:text-white px-10 py-2 rounded-sm shadow-none hover:shadow-none">
                            Post
                          </Button>
                        </div> */}
                          </form>
                        </div>
                      </div>
                    ) : (
                      <Link to={"/auth/signin"}>
                        <Button className="bg-transparent border-2 border-hover_color text-hover_color transition-all hover:bg-hover_color hover:text-white px-5 py-2 rounded-sm shadow-none hover:shadow-none">
                          Sign In to Post Your Answer
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="mt-5 bg-gray-100 py-3">
                    <h1 className="px-5 rounded-sm text-xl font-bold text-text_color_secondary capitalize">
                      {Answers.length} Answers
                    </h1>
                  </div>
                  {Answers.map((Answer, index) => {
                    return (
                      <div key={index} className="border-b py-5">
                        <div className="qaheader flex space-x-3">
                          <div className="flex flex-col space-y-2">
                            <img
                              src={
                                Answer.TeacherProfile.length !== 0
                                  ? Answer?.TeacherProfile[0].ProfilePicture
                                    ? Answer.TeacherProfile[0].ProfilePicture
                                    : "/assets/user.png"
                                  : Answer.StudentProfile[0].ProfilePicture
                                  ? Answer.StudentProfile[0].ProfilePicture
                                  : "/assets/user.png"
                              }
                              alt=""
                              className="h-[45px] w-[45px] rounded-full border-2 border-gray-300 p-[2px]"
                            />
                            <div className="bg-white w-fit px-3 py-1 flex flex-col items-center justify-center rounded-sm">
                              <BiUpArrow
                                size={18}
                                className="text-hover_color cursor-pointer hover:text-search_color hover:scale-105 transition-all"
                              />
                              <p>{Answer?.Votes ? Answer?.Votes : 0}</p>
                              <BiDownArrow
                                size={18}
                                className=" text-hover_color cursor-pointer hover:text-search_color hover:scale-105 transition-all"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="w-full flex items-center justify-between">
                              <h1 className="font-semibold text-lg text-text_color_secondary_2 capitalize">
                                {Answer.TeacherProfile.length !== 0
                                  ? Answer.TeacherProfile[0].FirstName +
                                    " " +
                                    Answer.TeacherProfile[0].LastName
                                  : Answer.StudentProfile[0].FirstName +
                                    " " +
                                    Answer.StudentProfile[0].LastName}
                              </h1>
                              <p className="flex items-center text-sm text-text_color_secondary_2">
                                <AiOutlineFieldTime
                                  size={20}
                                  className="mr-1 text-hover_color"
                                />
                                {moment(Answer?.createdAt).fromNow()}
                              </p>
                            </div>
                            {/* <Link to={"/qahub/12345"}>
                          <h1 className="text-3xl font-bold text-text_color hover:text-hover_color transition-all cursor-pointer capitalize">
                            {question.question}
                          </h1>
                        </Link> */}
                            <p className="mt-2">{Answer.Answer}</p>
                            {/* <div className="mt-3 bg-gray-100 p-5 flex items-center justify-between">
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
                              
                            </div> */}
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
      )}
    </>
  );
};

export default SingleDiscussion;
