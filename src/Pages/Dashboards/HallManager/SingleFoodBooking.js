import React from "react";
import DashboardUI from "../../../Components/Teacher/DashboardUI";
import SingleBookingComponent from "../../../Components/Teacher/SingleBooking";
import { useEffect } from "react";
import axios from "axios";
import { createAlert } from "../../../Redux/Alert";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import dayjs from "dayjs";

const SingleFoodBooking = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const BookingId = location.pathname.split("/").slice(-1);
  const [BookingDetail, setBookingDetail] = useState({});
  const [Status, setStatus] = useState();

  const ChangeStatus = (event) => {
    setStatus(event.target.value);
    const token = localStorage.getItem("authtoken");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hall-manager/food-bookings/${BookingId}/update`,
        { Status: event.target.value },
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          createAlert({
            type: "success",
            message: "Status Updated Successfully",
            options: {
              position: "top-right",
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          createAlert({
            type: "error",
            message: "Something went wrong! Try again later",
            options: {
              position: "top-right",
            },
          })
        );
      });
  };

  // GLOBAL FUNCTIONS
  const FetchBooking = () => {
    const token = localStorage.getItem("authtoken");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hall-manager/food-bookings/${BookingId}`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setBookingDetail(result.data?.Booking);
        setStatus(result?.data?.Booking?.Status?.toLowerCase());
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    FetchBooking();
    //  eslint-disable-next-line
  }, []);

  return (
    <DashboardUI>
      <div className="">
        <div className="mb-2 flex justify-between">
          <h1 className="font-bold text-text_color text-2xl mb-5 pl-1 border-l-[5px] border-hover_color">
            Booking Details:
          </h1>
        </div>
        {loading ? (
          <div className="min-h-[100px] w-full flex space-x-2 items-center justify-center">
            <CircularProgress disableShrink /> <h1>Loading..</h1>
          </div>
        ) : (
          <div className="shadow-sm p-10 rounded-md bg-white">
            <h1 className="font-bold text-text_color text-2xl pl-1 border-l-[5px] border-hover_color">
              Customer Detail:
            </h1>
            <div className="mt-10 grid grid-cols-10 gap-10">
              <div className="col-span-10">
                <div className="grid grid-cols-1 gap-x-5 gap-y-5">
                  <div className="col-span-1 grid grid-cols-2 gap-2">
                    <TextField
                      name="first-name"
                      id="FirstName"
                      type={"text"}
                      required
                      disabled={true}
                      label="First Name"
                      className="w-full mt-1"
                      variant="outlined"
                      size="medium"
                      value={BookingDetail?.FirstName}
                    />
                    <TextField
                      name="last-name"
                      id="LastName"
                      type={"text"}
                      required
                      disabled={true}
                      label="Last Name"
                      className="w-full mt-1"
                      variant="outlined"
                      size="medium"
                      value={BookingDetail?.LastName}
                    />
                  </div>
                  <div className="col-span-1">
                    <TextField
                      name="email"
                      id="email"
                      type={"text"}
                      required
                      disabled={true}
                      label="Your Email"
                      className="w-full mt-1"
                      variant="outlined"
                      size="medium"
                      value={BookingDetail?.Email}
                    />
                  </div>
                  <div className="col-span-1">
                    <TextField
                      name="mobile"
                      id="mobile"
                      type={"text"}
                      required
                      disabled={true}
                      label="Your Mobile Number"
                      className="w-full mt-1"
                      variant="outlined"
                      size="medium"
                      value={BookingDetail?.Number}
                    />
                  </div>
                  <div className="col-span-1">
                    <TextField
                      name="event-type"
                      id="event-type"
                      type={"text"}
                      required
                      disabled={true}
                      label="Event Type (e.g. Wedding/Birthday)"
                      className="w-full mt-1"
                      variant="outlined"
                      size="medium"
                      value={BookingDetail?.Event}
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-2">
                    <TextField
                      name="Date"
                      id="Date"
                      type={"text"}
                      required
                      label="Date"
                      disabled={true}
                      className="w-full mt-1"
                      variant="outlined"
                      size="medium"
                      value={dayjs(BookingDetail?.Date).format("DD/MM/YYYY")}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      for="description"
                      className="font-semibold text-text_color_secondary_2"
                    >
                      Additional Comments
                    </label>
                    <TextareaAutosize
                      id="description"
                      disabled={true}
                      name="description"
                      aria-label="minimum height"
                      minRows={5}
                      required
                      minLength={5}
                      placeholder="Additional Comments"
                      className="w-full border px-2 py-4"
                      value={BookingDetail?.Description}
                    />
                  </div>
                  <div className="col-span-1">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Status}
                        label="Status"
                        onChange={ChangeStatus}
                      >
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"approve"}>Approve</MenuItem>
                        <MenuItem value={"decline"}>Decline</MenuItem>
                      </Select>
                    </FormControl>{" "}
                  </div>
                  {/* 
                  <div className="col-span-1 mt-5">
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={addLoading ? true : false}
                      className="w-full text-[16px] bg-hover_color flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addLoading ? (
                        <CircularProgress
                          size={18}
                          disableShrink
                          sx={{ color: "white" }}
                        />
                      ) : (
                        <>
                          <RxReader className="mr-1" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </div> */}
                </div>
              </div>
              <div className="col-span-10 sticky top-5 h-fit space-y-5 ">
                <div className="border-2 border-dashed border-gray-500 p-5 rounded-md">
                  <div className="">
                    <h1 className="text-2xl text-text_color_secondary font-bold">
                      Selected Package
                    </h1>
                    <div className="mt-5">
                      <img
                        src={
                          BookingDetail?.Hall[0]?.Picture
                            ? `${
                                process.env.REACT_APP_BACKEND_URL +
                                "/" +
                                BookingDetail?.Hall[0]?.Picture
                              }`
                            : "/assets/TH1.jpg"
                        }
                        alt=""
                        className="h-[200px] w-full object-contain"
                      />
                      <h1 className="font-bold text-xl capitalize text-text_color_secondary_2">
                        {BookingDetail?.Title}
                      </h1>

                      <h1 className="mt-2 font-bold text-xl text-hover_color">
                        Bill Details:
                      </h1>
                      <span className="h-1 w-10 bg-hover_color block rounded-md"></span>
                      <div className="mt-3 w-full space-y-1">
                        <div className="flex items-center justify-between font-semibold">
                          <p>Hall</p>
                          <p className="text-hover_color">
                            PKR {BookingDetail?.Price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                          <p>Theme</p>
                          <p className="text-hover_color">
                            PKR {BookingDetail?.SelectedStage?.Theme?.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                          <p>Curtain</p>
                          <p className="text-hover_color">
                            PKR {BookingDetail?.SelectedStage?.Curtain?.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                          <p>Lights</p>
                          <p className="text-hover_color">
                            PKR {BookingDetail?.SelectedStage?.Lights?.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                          <p>Flowers</p>
                          <p className="text-hover_color">
                            PKR {BookingDetail?.SelectedStage?.Flowers?.price}
                          </p>
                        </div>
                      </div>
                      <h1 className="font-bold text-xl text-hover_color">
                        Total:
                      </h1>
                      <span className="mt-2 h-1 w-10 bg-hover_color block rounded-md"></span>
                      <div className="mt-2 text-white rounded-md font-bold text-center bg-hover_color w-full py-2">
                        Toal Bill:{" "}
                        {Number(BookingDetail?.Price) +
                          Number(BookingDetail?.SelectedStage?.Flowers?.price) +
                          Number(BookingDetail?.SelectedStage?.Lights?.price) +
                          Number(BookingDetail?.SelectedStage?.Curtain?.price) +
                          Number(BookingDetail?.SelectedStage?.Theme?.price)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                  <div className="h-fit border-2 border-dashed border-gray-500 p-5 rounded-md">
                    <h1 className="text-xl text-text_color_secondary font-bold">
                      Selected Theme Design
                    </h1>
                    <div className="mt-5">
                      <img
                        src={BookingDetail?.SelectedStage?.Theme?.picture}
                        alt=""
                        className="h-[200px] w-full object-contain"
                      />
                      <div className="mt-3">
                        <h1 className="font-bold text-xl capitalize text-hover_color">
                          {BookingDetail?.SelectedStage?.Theme?.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="h-fit border-2 border-dashed border-gray-500 p-5 rounded-md">
                    <h1 className="text-xl text-text_color_secondary font-bold">
                      Selected Curtain Design
                    </h1>
                    <div className="mt-5">
                      <img
                        src={BookingDetail?.SelectedStage?.Curtain?.picture}
                        alt=""
                        className="h-[200px] w-full object-contain"
                      />
                      <div className="mt-3">
                        <h1 className="font-bold text-xl capitalize text-hover_color">
                          {BookingDetail?.SelectedStage?.Curtain?.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="h-fit border-2 border-dashed border-gray-500 p-5 rounded-md">
                    <h1 className="text-xl text-text_color_secondary font-bold">
                      Selected Lights Design
                    </h1>
                    <div className="mt-5">
                      <img
                        src={BookingDetail?.SelectedStage?.Lights?.picture}
                        alt=""
                        className="h-[200px] w-full object-contain"
                      />
                      <div className="mt-3">
                        <h1 className="font-bold text-xl capitalize text-hover_color">
                          {BookingDetail?.SelectedStage?.Lights?.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="h-fit border-2 border-dashed border-gray-500 p-5 rounded-md">
                    <h1 className="text-xl text-text_color_secondary font-bold">
                      Selected Flowers Design
                    </h1>
                    <div className="mt-5">
                      <img
                        src={BookingDetail?.SelectedStage?.Flowers?.picture}
                        alt=""
                        className="h-[200px] w-full object-contain"
                      />
                      <div className="mt-3">
                        <h1 className="font-bold text-xl capitalize text-hover_color">
                          {BookingDetail?.SelectedStage?.Flowers?.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardUI>
  );
};

export default SingleFoodBooking;
