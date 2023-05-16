import { Button } from "@material-tailwind/react";
import { CircularProgress, Dialog, DialogActions } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createAlert } from "../../Redux/Alert";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllBookings = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authtoken");
  const [loading, setloading] = useState(false);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [allTutions, setallTutions] = useState([]);
  const [SelectedTution, setSelectedTution] = useState({});
  const [FoodBookings, setFoodBookings] = useState([]);

  // DELETE CONFIRM DIALOG
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedTution({});
  };

  // GLOBAL FUNCTIONS
  const FetchBookings = () => {
    setloading(true);
    const token = localStorage.getItem("authtoken");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/event-organizer/bookings`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setallTutions(result.data?.Halls);
        setFoodBookings(result.data?.Food);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteTution = async () => {
    setdeleteLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/tutions/deleteTution/${SelectedTution._id}`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setdeleteLoading(false);
        dispatch(
          createAlert({
            type: "success",
            message: "Tution Deleted Successfully",
            options: {
              position: "top-right",
            },
          })
        );
        handleCloseConfirmModal();
        FetchBookings();
      })
      .catch((error) => {
        setdeleteLoading(false);
        dispatch(
          createAlert({
            type: "error",
            message: "Something Went Wrong! Try Again",
            options: {
              position: "top-right",
            },
          })
        );
        console.log(error);
      });
  };
  useEffect(() => {
    FetchBookings();
    //  eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <div className=" flex justify-between">
        <h1 className="font-bold text-text_color text-2xl mb-5 pl-1 border-l-[5px] border-hover_color">
          ALL OF YOUR HALLS BOOKINGS
        </h1>
      </div>

      {openConfirmModal && (
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
              Do You Really Want to delete?
            </h1>
            <p className="px-3 py-1 bg-blue-200 w-fit font-semibold italic rounded-sm">
              {SelectedTution?.Title}
            </p>
            <DialogActions>
              <Button
                onClick={handleCloseConfirmModal}
                className="text-red-500 border border-red-500 px-5 py-3 shadow-none hover:shadow-none"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  DeleteTution();
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
      )}

      {loading ? (
        <div className="min-h-[100px] w-full flex space-x-2 items-center justify-center">
          <CircularProgress disableShrink /> <h1>Loading..</h1>
        </div>
      ) : (
        <div className="">
          <div className="">
            {allTutions.length === 0 ? (
              <p className="italic text-red-500">No Halls Booking Yet</p>
            ) : (
              <>
                <table className="min-w-full rounded border">
                  <thead className="bg-white">
                    <tr>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        S#
                      </th>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Name
                      </th>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Event
                      </th>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Date/Time
                      </th>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Price
                      </th>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Hall
                      </th>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Status
                      </th>
                      <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTutions.map((offering, index) => (
                      <tr
                        className="border-b border-gray-300 bg-white text-sm cursor-pointer hover:bg-gray-100 transition-all"
                        key={index}
                      >
                        <td className="py-3 px-5">
                          <div className="flex">
                            <div className="pl-2 pt-1">{index + 1}</div>
                          </div>
                        </td>
                        <td className="py-3 px-5">
                          {offering?.FirstName + " " + offering?.LastName}
                        </td>
                        <td className="py-3 px-5">
                          {offering?.Event ? offering?.Event : "Not Found"}
                        </td>
                        <td className="py-3 px-5">{offering?.Date}</td>
                        <td className="py-3 px-5">
                          RS:{" "}
                          <span className="font-bold">
                            {offering?.SelectedStage
                              ? Number(offering?.Price) +
                                Number(
                                  offering?.SelectedStage?.Flowers?.price
                                ) +
                                Number(offering?.SelectedStage?.Lights?.price) +
                                Number(
                                  offering?.SelectedStage?.Curtain?.price
                                ) +
                                Number(offering?.SelectedStage?.Theme?.price)
                              : "Not Found"}
                          </span>
                        </td>
                        <td className="py-3 px-5">
                          <img
                            src={
                              offering?.Hall[0]?.Picture
                                ? `${
                                    process.env.REACT_APP_BACKEND_URL +
                                    "/" +
                                    offering?.Hall[0]?.Picture
                                  }`
                                : "/assets/TH1.jpg"
                            }
                            className="h-[50px] w-auto object-contain rounded-md"
                            alt=""
                          />
                        </td>
                        <td className="py-3 px-5">
                          {offering?.Status ? offering?.Status : "Not Decided"}
                        </td>

                        <td className="py-3 px-5 flex items-center gap-2">
                          <Link
                            to={`/user/hall-manager/bookings/${offering._id}`}
                            className="edit-btn p-2 rounded-lg bg-[#fff8dd] hover:bg-[#ffc700] text-[#ffc700] hover:text-white transition-all"
                          >
                            <AiFillEye
                              size={20}
                              className="text-inherit edit-icon"
                            />
                          </Link>
                          {/* eslint-disable-next-line */}
                          <a
                            // onClick={() => deleteOffering(offering._id)}
                            className={`delete-btn bg-[#fff5f8] p-2 rounded-lg hover:bg-[#f1416c] text-[#f1416c] hover:text-white transition-all cursor-pointer`}
                          >
                            <MdDelete
                              size={20}
                              className="delete-icon text-inherit"
                            />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="my-10">
            <div className=" flex justify-between">
              <h1 className="font-bold text-text_color text-2xl mb-5 pl-1 border-l-[5px] border-hover_color">
                ALL OF YOUR Foods BOOKINGS
              </h1>
            </div>
            <div className="">
              {FoodBookings.length === 0 ? (
                <p className="italic text-red-500">No Foods Booking Yet</p>
              ) : (
                <>
                  <table className="min-w-full rounded border">
                    <thead className="bg-white">
                      <tr>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          S#
                        </th>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          Name
                        </th>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          Event
                        </th>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          Date/Time
                        </th>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          Price
                        </th>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          Hall
                        </th>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          Status
                        </th>
                        <th className="border-b-2 border-gray-200 bg-inherit px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {FoodBookings.map((offering, index) => (
                        <tr
                          className="border-b border-gray-300 bg-white text-sm cursor-pointer hover:bg-gray-100 transition-all"
                          key={index}
                        >
                          <td className="py-3 px-5">
                            <div className="flex">
                              <div className="pl-2 pt-1">{index + 1}</div>
                            </div>
                          </td>
                          <td className="py-3 px-5">
                            {offering?.FirstName + " " + offering?.LastName}
                          </td>
                          <td className="py-3 px-5">
                            {offering?.Event ? offering?.Event : "Not Found"}
                          </td>
                          <td className="py-3 px-5">{offering?.Date}</td>
                          <td className="py-3 px-5">
                            RS:{" "}
                            <span className="font-bold">
                              {offering?.Price ? offering?.Price : "Not Found"}
                            </span>
                          </td>
                          <td className="py-3 px-5">
                            <img
                              src={
                                offering?.FoodDetail[0]?.Picture
                                  ? `${
                                      process.env.REACT_APP_BACKEND_URL +
                                      "/" +
                                      offering?.FoodDetail[0]?.Picture
                                    }`
                                  : "/assets/TH1.jpg"
                              }
                              className="h-[50px] w-auto object-contain rounded-md"
                              alt=""
                            />
                          </td>
                          <td className="py-3 px-5">
                            {offering?.Status
                              ? offering?.Status
                              : "Not Decided"}
                          </td>

                          <td className="py-3 px-5 flex items-center gap-2">
                            <Link
                              to={`/user/hall-manager/bookings/${offering._id}`}
                              className="edit-btn p-2 rounded-lg bg-[#fff8dd] hover:bg-[#ffc700] text-[#ffc700] hover:text-white transition-all"
                            >
                              <AiFillEye
                                size={20}
                                className="text-inherit edit-icon"
                              />
                            </Link>
                            {/* eslint-disable-next-line */}
                            <a
                              // onClick={() => deleteOffering(offering._id)}
                              className={`delete-btn bg-[#fff5f8] p-2 rounded-lg hover:bg-[#f1416c] text-[#f1416c] hover:text-white transition-all cursor-pointer`}
                            >
                              <MdDelete
                                size={20}
                                className="delete-icon text-inherit"
                              />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
