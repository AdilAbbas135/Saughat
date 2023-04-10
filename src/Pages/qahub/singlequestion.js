import { Button } from "@material-tailwind/react";
import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import { RiPenNibFill } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/qahub/Sidebar";
import { createAlert } from "../../Redux/Alert";

const Singlequestion = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [Applyloading, setApplyloading] = useState(false);
  const [AlreadyApplied, setAlreadyApplied] = useState(false);
  const [Question, setQuestion] = useState({});
  const session = useSelector((state) => state.session?.session);
  const token = localStorage.getItem("authtoken");

  const fetchQuestion = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/qahub/FindQuestion?id=${
          location.pathname.split("/")[2]
        }`
      )
      .then((result) => {
        console.log(result);
        setQuestion(result.data.question[0]);
        //eslint-disable-next-line
        result.data.question[0].PeopleApplied.filter((elem) => {
          if (elem === session?.user?.profileId) {
            return setAlreadyApplied(true);
          }
        });
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          createAlert({
            type: "error",
            message: "Something Went Wrong! Try Again",
          })
        );
      });
  };

  const ApplyForJob = async (id) => {
    setApplyloading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/qahub/applyForQaHub?id=${id}`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        setApplyloading(false);
        dispatch(
          createAlert({
            type: "success",
            message: "Applied Successfully",
          })
        );
        fetchQuestion();
      })
      .catch((error) => {
        setApplyloading(false);
        dispatch(
          createAlert({
            type: "error",
            message: "Something Went Wrong! Try Again",
          })
        );
        console.log(error);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchQuestion();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastContainer />
      <Header page={"singlequestion"} />
      <div className="my-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <div className="mt-5 grid grid-cols-10 gap-x-3">
          <div className="col-span-7 border-2 border-gray-200 bg-white p-5 rounded-sm">
            <div className="border-b py-5">
              {loading ? (
                <div className="qaheader flex space-x-3">
                  <Skeleton variant="circular" width={45} height={45} />
                  <div className="w-full">
                    <div className="w-full flex items-center justify-between">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "15px" }}
                        className="w-[100px]"
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "15px" }}
                        className="w-[100px]"
                      />
                    </div>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "35px" }}
                      className="w-[300px]"
                    />
                    <Skeleton
                      variant="rounded"
                      height={100}
                      className="w-full max-w-[90%]"
                    />
                  </div>
                </div>
              ) : (
                <div className="qaheader flex space-x-3">
                  <img
                    src={
                      Question?.Student[0]?.ProfilePicture
                        ? Question?.Student[0]?.ProfilePicture
                        : "/assets/user.png"
                    }
                    alt=""
                    className="h-[45px] w-[45px] rounded-full border-2 border-gray-300 p-[2px]"
                  />
                  <div className="w-full">
                    <div className="w-full flex items-center justify-between">
                      <h1 className="font-semibold text-sm text-text_color_secondary_2 capitalize">
                        {Question?.Student[0]?.FirstName +
                          " " +
                          Question?.Student[0]?.LastName}
                      </h1>
                      <p className="flex items-center text-sm text-text_color_secondary_2">
                        <AiOutlineFieldTime
                          size={20}
                          className="mr-1 text-hover_color"
                        />
                        {moment(Question?.createdAt).fromNow()}
                      </p>
                    </div>
                    <h1 className="text-3xl font-bold text-text_color capitalize">
                      {Question?.Title}
                    </h1>
                    <p className="mt-2">{Question?.Description}</p>
                    <div className="mt-3 bg-gray-100 p-5 flex items-center justify-between">
                      <div className=" flex items-center space-x-3">
                        <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                          <RxPerson className="text-hover_color mr-1" />
                          <p>{Question?.PeopleApplied.length} people applied</p>
                        </div>
                        <div className="bg-white w-fit px-5 py-2 flex items-center rounded-sm">
                          <AiOutlineEye className="text-hover_color mr-1" />
                          <p>100 views</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-x-2 space-y-1">
                        <Button
                          disabled={
                            session?.user?.role === "teacher" && !AlreadyApplied
                              ? false
                              : true
                          }
                          onClick={() => ApplyForJob(Question?._id)}
                          className="px-7 flex items-center rounded-sm py-2 bg-hover_color hover:bg-main_bg_color shadow-none hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RiPenNibFill className="mr-1" /> Apply
                        </Button>
                        {token && session?.user?.role !== "teacher" && (
                          <span className="text-red-500 text-sm italic">
                            Only Teachers can apply
                          </span>
                        )}
                        {!token && (
                          <span className="text-red-500 text-sm italic">
                            Please Login to Continue
                          </span>
                        )}
                        {AlreadyApplied && (
                          <span className="text-red-500 text-sm italic">
                            You Have Already Applied to this Question
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3 border-2 border-gray-200 bg-white p-5 runded-sm">
            <Sidebar />
          </div>
        </div>
        {Applyloading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <div className="flex items-center gap-2">
              <CircularProgress size={25} color="inherit" />
              <h2>Applying! Please Wait</h2>
            </div>
          </Backdrop>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Singlequestion;
