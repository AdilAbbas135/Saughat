import { CircularProgress, TextField, TextareaAutosize } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SingleBooking = () => {
  const location = useLocation();
  const [loading, setloading] = useState(true);
  const BookingId = location.pathname.split("/").slice(-1);
  const [BookingDetail, setBookingDetail] = useState({});

  // GLOBAL FUNCTIONS
  const FetchBooking = () => {
    const token = localStorage.getItem("authtoken");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hall-manager/bookings/${BookingId}`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setBookingDetail(result.data?.Booking);
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
                    value={BookingDetail?.Date}
                  />
                  <TextField
                    name="capacity"
                    id="capacity"
                    type={"number"}
                    required
                    label="Capacity"
                    className="w-full mt-1"
                    variant="outlined"
                    size="medium"
                    disabled={true}
                    value={BookingDetail?.Capacity}
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
                  <h1 className="font-bold text-text_color text-2xl pl-1 border-l-[5px] border-hover_color">
                    Hall Detail:
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
                    <div className="mt-3">
                      <h1 className="font-bold text-xl capitalize text-hover_color">
                        {BookingDetail?.Hall[0]?.Title}
                      </h1>
                      <p className="text-sm text-text_color_secondary_2">
                        {BookingDetail?.Hall[0]?.Description}
                      </p>
                    </div>
                    <div className="mt-2 text-white rounded-md font-bold text-center bg-hover_color w-full py-2">
                      PKR {BookingDetail?.Hall[0]?.Price}{" "}
                    </div>
                    <p className="text-sm text-text_color_secondary_2 text-center mt-1">
                      Capacity {BookingDetail?.Hall[0]?.Capacity} (people)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBooking;
