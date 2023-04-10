import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CircularProgress } from "@mui/material";

const GetQaHubApprovals = () => {
  const socket = useRef(io("ws://localhost:8000"));
  const token = localStorage.getItem("authtoken");
  const [Approvals, setApprovals] = useState([]);
  const [loading, setloading] = useState(true);

  const FetchQaHubRooms = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/qahub/rooms/get-rooms`,
        {},
        { headers: { token: token } }
      )
      .then((response) => {
        setApprovals(response.data);
        setloading(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    FetchQaHubRooms();
    socket.current.on("connection", (message) => {
      console.log(message);
    });
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold leading-6 text-gray-900 border-l-4 border-hover_color pl-2 capitalize">
        Q&A HUB UPDATES
      </h1>
      <div className="mt-5 bg-white rounded-md border-2 border-gray-200 p-5 space-y-6">
        {loading ? (
          <CircularProgress size={25} />
        ) : (
          <>
            {Approvals.length < 1 ? (
              <p>No Updates Right Now</p>
            ) : (
              Approvals.map((approval, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between space-x-3"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={
                          approval.Student[0]?.ProfilePicture
                            ? approval.Student[0]?.ProfilePicture
                            : "/assets/user.png"
                        }
                        alt=""
                        className="h-[50px] w-[50px] rounded-full"
                      />
                      <div>
                        <h1 className="capitalize font-semibold text-lg ">
                          {approval.Student[0].FirstName +
                            " " +
                            approval.Student[0].LastName}
                        </h1>
                        <p className="text-sm">Accepted Your Request For Q&A</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className="bg-main_color_2 px-3 py-1 text-sm rounded-sm italic flex items-center">
                        {approval.Question[0].Title}{" "}
                        <HiOutlineExternalLink size={15} className="ml-2" />
                      </p>
                    </div>
                    <div className="buttons flex items-center space-x-2">
                      <Button
                        ripple
                        className="bg-hover_color text-white px-4 py-2 shadow-none hover:shadow-none font-semibold text-[15px] rounded-md"
                      >
                        Enter Room
                      </Button>
                      <Button
                        ripple
                        className="bg-red-500 text-white px-4 py-2 shadow-none hover:shadow-none font-semibold text-[15px] rounded-md"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GetQaHubApprovals;
