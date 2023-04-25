import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Message from "../../Components/qahub/Qa-Room/Message";
import { ImExit } from "react-icons/im";
import { Button } from "@material-tailwind/react";
import { BsImages } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAlert } from "../../Redux/Alert";
import { io } from "socket.io-client";
import { CircularProgress, Dialog, DialogActions, Rating } from "@mui/material";

const QaHubRoom = () => {
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef = useRef();
  const token = searchParams.get("Token");
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
  const [msgLoading, setmsgLoading] = useState(false);
  const socket = useRef();
  const [Data, setData] = useState({
    SenderId: searchParams.get("SenderId"),
    RecieverId: searchParams.get("RecieverId"),
    QuestionId: searchParams.get("QuestionId"),
    RoomId: searchParams.get("RoomId"),
    RoomStatus: false,
    userRole: searchParams.get("userRole"),
    Message: "",
  });
  const [AllMessages, setAllMessages] = useState([]);
  const [NewMessage, setNewMessage] = useState({});

  // DELETE CONFIRM DIALOG
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };
  // const handleOpenConfirmModal = () => {
  //   setOpenConfirmModal(true);
  // };

  // FEEDBACK DIALOG
  //eslint-disable-next-line
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const handleCloseFeedbackModal = () => {
    setOpenFeedbackModal(false);
  };
  const handleOpenFeedbackModal = () => {
    setOpenFeedbackModal(true);
  };

  const SendMessage = async () => {
    setmsgLoading(true);
    setAllMessages([
      ...AllMessages,
      {
        Message: Data.Message,
        SenderId: Data.SenderId,
        RecieverId: Data.RecieverId,
        createdAt: new Date(),
      },
    ]);
    socket.current.emit("SendMessage", {
      SenderId: Data.SenderId,
      RecieverId: Data.RecieverId,
      Message: Data.Message,
    });
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/qahub/conversation/send-message`,
        Data,
        { headers: { token: token } }
      )
      .then((response) => {
        // console.log(response);
        setData({ ...Data, Message: "" });
        setmsgLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setmsgLoading(false);
        dispatch(
          createAlert({
            type: "error",
            message: "Error in Sending Message. Please try again!",
          })
        );
      });
  };

  const FetchChat = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/qahub/conversation`, Data, {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);
        if (!response.data.error) {
          setAllMessages(response.data);
          setData({ ...Data, RoomStatus: true });
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          createAlert({
            type: "error",
            message: "Error in Fetching Chat History",
          })
        );
      });
  };
  useEffect(() => {
    FetchChat();
    socket.current = io("ws://localhost:8000");
    socket.current.on("GetMessage", (MessageDetail) => {
      console.log("Message received from socker");
      console.log(MessageDetail);
      setNewMessage({
        Message: MessageDetail.Message,
        SenderId: MessageDetail.SenderId,
        RecieverId: MessageDetail.RecieverId,
        createdAt: new Date(),
      });
    });
    socket.current.on("EndRoom", (data) => {
      setData({ ...Data, RoomStatus: false });
      if (Data.userRole === "student") {
        handleOpenFeedbackModal();
      }
    });
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (NewMessage?.Message) {
      setAllMessages([...AllMessages, NewMessage]);
    }
    //eslint-disable-next-line
  }, [NewMessage]);

  useEffect(() => {
    if (AllMessages.length > 1) {
      scrollRef?.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [AllMessages]);
  useEffect(() => {
    socket.current.emit("AddUser", Data);
    // socket.current.emit("CreateRoom", Data);
    // socket.current.on("GetUsers", (Data2) => {
    //   console.log(Data2);
    // });
    //eslint-disable-next-line
  }, [socket]);

  const DeleteDialogue = () => {
    const [deleteLoading, setdeleteLoading] = useState(false);
    const CloseRoom = async () => {
      setdeleteLoading(true);
      await axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/qahub/rooms/close-room`, {
          RoomId: Data.RoomId,
        })
        .then((response) => {
          console.log(response);
          setData({ ...Data, RoomStatus: false });
          socket.current.emit("EndRoom", Data);
          if (Data.userRole === "student") {
            handleOpenFeedbackModal();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="px-10 py-5 flex flex-col items-center justify-center space-y-3">
          <img
            src="/assets/icons8-warning-shield-64.png"
            className="h-[100px] w-[100px] object-cover"
            alt=""
          />
          <h1 className="text-2xl font-bold">
            Do You Really Want to Close the Room?
          </h1>
          {/* <p className="px-3 py-1 bg-blue-200 w-fit font-semibold italic rounded-sm">
          {SelectedTution?.Title}
        </p> */}
          <DialogActions>
            <Button
              disabled={deleteLoading ? true : false}
              onClick={handleCloseConfirmModal}
              className="text-red-500 border border-red-500 px-5 py-3 shadow-none hover:shadow-none"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                CloseRoom();
              }}
              disabled={deleteLoading ? true : false}
              className="text-white bg-hover_color px-5 py-3 shadow-none hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteLoading ? (
                <CircularProgress
                  size={18}
                  disableShrink
                  sx={{ color: "white" }}
                />
              ) : (
                <>Confirm</>
              )}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  };

  const ProvideFeedback = () => {
    const [btnLoading, setbtnLoading] = useState(false);
    const [CommunicationValue, setCommunicationValue] = useState(0);
    const [SolvedProblemValue, setSolvedProblem] = useState(0);
    const [WayOfTeachingValue, setWayOfTeachingValue] = useState(0);
    const [Feedback, setFeedback] = useState("");

    const data = {
      communication: CommunicationValue,
      SolvedProblem: SolvedProblemValue,
      WayOfTeaching: WayOfTeachingValue,
      Feedback,
      TeacherId: Data.RecieverId,
      StudentId: Data.SenderId,
      QuestionId: Data.QuestionId,
    };
    const PostFeedback = async () => {
      setbtnLoading(true);
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/qahub/feedback/create`,
          data
        )
        .then((response) => {
          console.log(response);
          dispatch(
            createAlert({
              type: "success",
              message: "Your feedback has been Recorded",
            })
          );
          handleCloseFeedbackModal();
          setbtnLoading(false);
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            createAlert({
              type: "error",
              message: "Error in Posting Feedback",
            })
          );
          handleCloseFeedbackModal();
          setbtnLoading(false);
        });
    };

    return (
      <Dialog
        open={openFeedbackModal}
        onClose={handleCloseFeedbackModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="px-10 py-5 flex flex-col items-center justify-center space-y-3">
          <img
            src="/assets/review-icon.png"
            className="h-[100px] w-[100px] object-cover"
            alt=""
          />
          <h1 className="text-2xl font-bold">
            Provide Your valueable Feedback
          </h1>
          <div className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                PostFeedback();
              }}
            >
              <div className="space-y-2">
                <div className="w-full flex flex-col items-center justify-center">
                  <p>Communication</p>
                  <Rating
                    precision={0.5}
                    name="simple-controlled"
                    value={CommunicationValue}
                    onChange={(event, newValue) => {
                      setCommunicationValue(newValue);
                    }}
                  />
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <p>Solved Problem</p>
                  <Rating
                    precision={0.5}
                    name="simple-controlled"
                    value={SolvedProblemValue}
                    onChange={(event, newValue) => {
                      setSolvedProblem(newValue);
                    }}
                  />
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <p>Way of Explaining</p>
                  <Rating
                    precision={0.5}
                    name="simple-controlled"
                    value={WayOfTeachingValue}
                    onChange={(event, newValue) => {
                      setWayOfTeachingValue(newValue);
                    }}
                  />
                </div>
                <div className="w-full">
                  <p>Feedback: </p>
                  <textarea
                    rows={5}
                    placeholder="Your Custom Response"
                    className="border border-gray-200 w-full p-1 resize-none"
                    value={Feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <DialogActions>
                  <div className="w-full flex items-start justify-center space-x-2">
                    <Button
                      disabled={btnLoading ? true : false}
                      onClick={handleCloseConfirmModal}
                      className="text-red-500 border border-red-500 px-5 py-2 rounded-[3px] shadow-none hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed font-normal"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={btnLoading ? true : false}
                      className="text-white bg-hover_color px-5 py-2 rounded-[3px] shadow-none hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {btnLoading ? (
                        <CircularProgress
                          size={18}
                          disableShrink
                          sx={{ color: "white" }}
                        />
                      ) : (
                        <>Submit</>
                      )}
                    </Button>
                  </div>
                </DialogActions>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <>
      {Loading ? (
        <div className="h-screen flex flex-col space-y-2 items-center justify-center">
          <div className="flex space-x-2 items-center">
            <CircularProgress size={18} disableShrink sx={{ color: "white" }} />
            <h3>Please Wait</h3>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-2xl mx-auto px-2">
          {openFeedbackModal && <ProvideFeedback />}
          {Data.RoomStatus === false ? (
            <div className=" min-h-screen w-full flex flex-col items-center justify-center space-y-2">
              <div>
                <img
                  src={"/TH-black.png"}
                  className="h-[100px] w-auto object-cover mx-auto"
                  alt=""
                />
              </div>
              <h3 className="text-red-500 text-xl font-semibold">
                Room Has Been Closed
              </h3>
            </div>
          ) : (
            <>
              <div className="w-full sticky top-0 bg-white flex items-center justify-between">
                <div className="flex-1">
                  <img
                    src={"/TH-black.png"}
                    className="h-[60px] w-auto object-cover mx-auto"
                    alt=""
                  />
                </div>
                <div className="actions flex-1 flex justify-end">
                  <button
                    onClick={() => {
                      setOpenConfirmModal(true);
                    }}
                    className="flex items-center bg-main_color_2 p-2 px-4 rounded-md cursor-pointer"
                  >
                    <ImExit size={25} className="mr-1" />
                    <p>Exit Room</p>
                  </button>
                </div>
                {openConfirmModal && <DeleteDialogue />}
              </div>
              <div className="messages">
                {AllMessages.length < 1 ? (
                  <div className="h-screen flex items-center justify-center">
                    <h3>No Messages to show</h3>
                  </div>
                ) : (
                  <div className="">
                    {AllMessages.map((msg, index) => {
                      return (
                        <div ref={scrollRef} key={index} className="">
                          <Message
                            own={msg.SenderId === Data.SenderId ? true : false}
                            message={{
                              text: msg.Message,
                              createdAt: msg.createdAt,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="sticky bg-white w-full max-w-2xl bottom-0 border-t-2 border-main_bg_color">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    SendMessage();
                  }}
                >
                  <div className="w-full p-3 flex">
                    <textarea
                      rows={3}
                      className="w-full border-none outline-none focus:outline-none resize-none"
                      type="text"
                      placeholder="Enter Your Message"
                      value={Data.Message}
                      onChange={(e) => {
                        setData({ ...Data, Message: e.target.value });
                      }}
                    />
                    <div className="flex items-center space-x-1">
                      <BsImages
                        size={45}
                        className=" bg-main_color_2 h-fit py-2 px-3 rounded-sm cursor-pointer"
                      />
                      <Button
                        type="submit"
                        ripple={true}
                        disabled={msgLoading ? true : false}
                        className="bg-hover_color rounded-[3px] shadow-none hover:shadow-none text-white px-4 py-1 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default QaHubRoom;
