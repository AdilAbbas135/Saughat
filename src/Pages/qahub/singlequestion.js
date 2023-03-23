import { Button } from "@material-tailwind/react";
import { Skeleton } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import { RiPenNibFill } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/qahub/Sidebar";

const Singlequestion = () => {
  const location = useLocation();
  const [loading, setloading] = useState(true);
  const [Question, setQuestion] = useState({});
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
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchQuestion();
    //eslint-disable-next-line
  }, []);

  return (
    <>
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
                      <div className="flex items-center space-x-2">
                        <Button className="px-7 flex items-center rounded-sm py-2 bg-hover_color hover:bg-main_bg_color shadow-none hover:shadow-none">
                          <RiPenNibFill className="mr-1" /> Apply
                        </Button>
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
      </div>
      <Footer />
    </>
  );
};

export default Singlequestion;
