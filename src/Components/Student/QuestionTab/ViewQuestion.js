import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcClock } from "react-icons/fc";
import moment from "moment/moment";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "../../../Redux/Alert";

const ViewQuestion = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");
  const session = useSelector((state) => state.session.session.user);
  const [Question, setQuestion] = useState({});
  const [loading, setloading] = useState(true);
  const [Applyloading, setApplyloading] = useState(false);
  const [BackdropMessage, setBackdropMessage] = useState(
    "Ceating Qa Hub Room! Please Wait"
  );

  // DELETE CONFIRM DIALOG
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };
  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };
  useEffect(() => {
    axios
      .post(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/qahub/FindQuestionDetails/${location.pathname.split("/").slice(-1)}`,
        {},
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        setQuestion(response.data.question);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          createAlert({
            type: "error",
            message: "Something went wrong! Reload the Page",
          })
        );
      });
    // eslint-disable-next-line
  }, []);

  const AcceptQaRequest = async (Teacher) => {
    setApplyloading(true);
    const data = {
      QuestionId: Question._id,
      TeacherId: Teacher._id,
    };

    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/qahub/rooms/createroom`,
        { data },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        setBackdropMessage(
          "Room created So Kindly wait in that until the Teachers Joins"
        );
        // socket.current = io(process.env.REACT_APP_SOCKET_URL);
        // socket.current.emit("AddUser", { SenderId: session.profileId });
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=600,height=450,left=100,top=100`;
        window.open(
          `/qahub/create-room/roomDetails?SenderId=${session.profileId}&RecieverId=${Teacher._id}&QuestionId=${Question._id}&Token=${token}&RoomId=${response.data.Room._id}&userRole=student`,
          "QAHUB ROOM",
          params
        );

        dispatch(
          createAlert({
            type: "success",
            message: "Question Accepted Successfully",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          createAlert({
            type: "error",
            message: "Something went wrong! Reload the Page",
          })
        );
      });
  };

  const DeleteDialogue = () => {
    const [deleteLoading, setdeleteLoading] = useState(false);
    const CloseRoom = async () => {
      setdeleteLoading(true);
      const data = { questionid: Question._id };
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/qahub/deletequestion`,
          data,
          { headers: { token: token } }
        )
        .then((response) => {
          console.log(response);
          dispatch(
            createAlert({
              type: "success",
              message: "Question Deleted Successfully",
            })
          );
          navigate("/user/student/questions");
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            createAlert({
              type: "error",
              message: "Error in Deleting the Question",
            })
          );
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
  return (
    <div className="grid grid-cols-2 gap-4">
      {openConfirmModal && <DeleteDialogue />}
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900"> Question Details:</h1>
        <span className="block ml-[2px] h-1 w-14 bg-search_color rounded-full"></span>
        <div className="question mt-5 p-5 bg-white border-2 border-gray-200 rounded-md flex flex-col space-y-2">
          {loading ? (
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "30px", lineHeight: "30px" }}
              />
              <Skeleton variant="text" sx={{ fontSize: "10px" }} />
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%" }}
                height={60}
              />
              <div className="mt-10 cta flex items-center space-x-2">
                <Skeleton variant="rectangular" width={100} height={50} />
                <Skeleton variant="rectangular" width={100} height={50} />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900">
                {Question.Title}
              </h1>
              <div className="flex items-center space-x-2 text-sm">
                <FcClock size={18} />
                <p>{moment(Question.createdAt).format("MMMM DD, YYYY")}</p>
              </div>

              <p className="text-[16px]">{Question.Description}</p>
              <div className="mt-10 cta flex items-center space-x-2">
                <Button
                  ripple
                  className="bg-hover_color text-white px-7 py-2 shadow-none hover:shadow-none font-semibold text-[15px] rounded-md"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleOpenConfirmModal()}
                  ripple
                  className="bg-red-500 text-white px-6 py-2 shadow-none hover:shadow-none font-semibold text-[15px] rounded-md"
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900">Teachers Applied</h1>
        <span className="block ml-[2px] h-1 w-14 bg-search_color rounded-full"></span>
        <div className="mt-5 border-2 border-gray-200 bg-white rounded-md p-5">
          <div className=" flex flex-col space-y-5">
            {loading ? (
              <>
                <div className="flex items-center justify-between space-x-3">
                  <div className="flex items-center space-x-1">
                    <Skeleton variant="circular" width={45} height={45} />
                    <Skeleton
                      variant="text"
                      width={100}
                      sx={{ fontSize: "18px", lineHeight: "28px" }}
                    />
                  </div>
                  <div className="buttons flex items-center space-x-2">
                    <Skeleton variant="rectangular" width={100} height={50} />
                    <Skeleton variant="rectangular" width={100} height={50} />
                  </div>
                </div>
              </>
            ) : (
              <>
                {Question.Teachers_Applied.length < 1 ? (
                  <h1 className="italic text-red-500">
                    No One Applied Till NOW
                  </h1>
                ) : (
                  Question.Teachers_Applied.map((teacher, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between space-x-3"
                      >
                        <div className="flex items-center space-x-1">
                          <img
                            src={
                              teacher?.ProfilePicture
                                ? teacher?.ProfilePicture
                                : "./assets/user.png"
                            }
                            alt=""
                            className="h-[50px] w-[50px] rounded-full"
                          />
                          <h1 className="capitalize font-semibold text-lg">
                            {teacher?.FirstName.toLowerCase() +
                              " " +
                              teacher?.LastName.toLowerCase()}
                          </h1>
                        </div>
                        <div className="buttons flex items-center space-x-2">
                          <Button
                            ripple
                            onClick={() => AcceptQaRequest(teacher)}
                            className="bg-hover_color text-white px-6 py-2 shadow-none hover:shadow-none font-semibold text-[15px] rounded-md"
                          >
                            Accept
                          </Button>
                          <Button className="bg-transparent text-text_color_secondary text-[15px] rounded-md border-2 border-hover_color px-3 py-2 shadow-none hover:shadow-none">
                            View Profile
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
      </div>
      {/* {Applyloading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <div className="flex items-center gap-2">
            <CircularProgress size={25} color="inherit" />
            <h2>{BackdropMessage}</h2>
          </div>
        </Backdrop>
      )} */}
    </div>
  );
};

export default ViewQuestion;
