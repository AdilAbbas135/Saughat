import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const GetQaHubApprovals = () => {
  const socket = useRef();
  const token = localStorage.getItem("authtoken");
  const [Approvals, setApprovals] = useState([]);
  const [loading, setloading] = useState(true);
  const session = useSelector((state) => state.session.session.user);
  const [UpdatedRoom, setUpdatedRoom] = useState(null);

  const EnterRoom = (approval) => {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=600,height=450,left=100,top=100`;

    window.open(
      `/qahub/create-room/roomDetails?RecieverId=${approval.StudentId}&SenderId=${session.profileId}&QuestionId=${approval.QuestionId}&Token=${token}&RoomId=${approval._id}&userRole=teacher`,
      "QAHUB ROOM",
      params
    );
  };

  const FetchQaHubRooms = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/qahub/rooms/get-rooms`,
        {},
        { headers: { token: token } }
      )
      .then((response) => {
        // console.log("qa hub updates are");
        // console.log(response);
        setApprovals(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchQaHubRooms();
    socket.current = io(`${process.env.REACT_APP_SOCKET_URL}`);
    socket.current.on("RoomCreated", async (data) => {
      console.log("room created for you");
      console.log(data);
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/qahub/rooms/getUpdates`,
          data,
          { headers: { token: token } }
        )
        .then((response) => {
          console.log(response);
          const approval = response.data;
          approval.new = true;
          setApprovals((oldarray) => [...oldarray, approval]);
        });
    });
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const Data = {
      SenderId: session.profileId,
    };
    socket.current.emit("AddUser", Data);
    //eslint-disable-next-line
  }, [socket]);

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
                          approval?.Student[0]?.ProfilePicture
                            ? approval.Student[0]?.ProfilePicture
                            : "/assets/user.png"
                        }
                        alt=""
                        className="h-[50px] w-[50px] rounded-full"
                      />
                      <div>
                        <h1 className="capitalize font-semibold text-lg ">
                          {approval?.Student[0].FirstName +
                            " " +
                            approval?.Student[0].LastName}
                        </h1>
                        <p className="text-sm">Accepted Your Request For Q&A</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <a
                        href={`/qahub/${approval?.Question[0]?._id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p className="bg-main_color_2 px-3 py-1 text-sm rounded-sm italic flex items-center">
                          {approval?.Question[0].Title}{" "}
                          <HiOutlineExternalLink size={15} className="ml-2" />
                        </p>
                      </a>
                    </div>
                    <div className="buttons flex items-center space-x-2">
                      {approval?.new && (
                        <span className="block bg-red-500 text-white px-4 py-2 shadow-none hover:shadow-none font-semibold text-[15px] rounded-md">
                          New
                        </span>
                      )}

                      <Button
                        onClick={() => EnterRoom(approval)}
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
