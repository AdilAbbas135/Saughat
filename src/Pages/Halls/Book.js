import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../Components/Loader";
import Header from "../../Components/Header/Header";
import { Button } from "@material-tailwind/react";
import { CircularProgress, TextField, TextareaAutosize } from "@mui/material";
import { RxReader } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "../../Redux/Alert";

const Book = () => {
  const session = useSelector((state) => state.session.session);
  const location = useLocation();
  const dispatch = useDispatch();
  const HallId = location.pathname.split("/")[2];
  const [loading, setloading] = useState(true);
  const [Tution, setTution] = useState({});
  const [addLoading, setaddLoading] = useState(false);
  const [TutionData, setTutionData] = useState({});
  const token = localStorage.getItem("authtoken");

  const FetchHall = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/find/halls/singleHall?HallId=${HallId}`
      )
      .then((response) => {
        console.log(response);
        setTution(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const AddBooking = async () => {
    setaddLoading(true);
    const data = { TutionData, HallDetail: Tution, userDetail: session };
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/booking/hall`, data, {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);
        setTutionData(null);
        dispatch(
          createAlert({
            type: "success",
            message: "Booking Added Successfully",
            options: {
              position: "top-right",
            },
          })
        );
        setaddLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setaddLoading(false);
        dispatch(
          createAlert({
            type: "error",
            message: error?.response?.data?.error
              ? error?.response?.data?.error
              : "Something went wrong! Try again later",
            options: {
              position: "top-right",
            },
          })
        );
      });
  };
  useEffect(() => {
    console.log(location.pathname.split("/"));
    FetchHall();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header page="SingleTution" />
          <div className="py-10 w-full max-w-7xl mx-auto">
            <h1 className="text-2xl text-text_color_secondary font-bold text-center uppercase">
              Complete Your Booking
            </h1>
            <div className="mt-5 grid grid-cols-10 gap-10">
              <div className="col-span-6">
                <div className="border-2 border-dashed border-gray-500 p-5 rounded-md">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      AddBooking();
                    }}
                  >
                    <div className="grid grid-cols-1 gap-x-5 gap-y-5">
                      <div className="col-span-1 grid grid-cols-2 gap-2">
                        <TextField
                          name="first-name"
                          id="FirstName"
                          type={"text"}
                          required
                          label="First Name"
                          className="w-full mt-1"
                          variant="outlined"
                          size="medium"
                          value={TutionData?.FirstName}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              FirstName: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          name="last-name"
                          id="LastName"
                          type={"text"}
                          required
                          label="Last Name"
                          className="w-full mt-1"
                          variant="outlined"
                          size="medium"
                          value={TutionData?.LastName}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              LastName: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <TextField
                          name="email"
                          id="email"
                          type={"text"}
                          required
                          label="Your Email"
                          className="w-full mt-1"
                          variant="outlined"
                          size="medium"
                          value={TutionData?.Email}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              Email: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <TextField
                          name="mobile"
                          id="mobile"
                          type={"text"}
                          required
                          label="Your Mobile Number"
                          className="w-full mt-1"
                          variant="outlined"
                          size="medium"
                          value={TutionData?.Number}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              Number: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <TextField
                          name="event-type"
                          id="event-type"
                          type={"text"}
                          required
                          label="Event Type (e.g. Wedding/Birthday)"
                          className="w-full mt-1"
                          variant="outlined"
                          size="medium"
                          value={TutionData?.Event}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              Event: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="col-span-1 grid grid-cols-2 gap-2">
                        <TextField
                          name="Date"
                          id="Date"
                          type={"text"}
                          required
                          label="Date"
                          className="w-full mt-1"
                          variant="outlined"
                          size="medium"
                          value={TutionData?.Date}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              Date: e.target.value,
                            });
                          }}
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
                          value={TutionData?.Capacity}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              Capacity: e.target.value,
                            });
                          }}
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
                          name="description"
                          aria-label="minimum height"
                          minRows={5}
                          required
                          minLength={5}
                          placeholder="Additional Comments"
                          className="w-full border px-2 py-4"
                          value={TutionData?.Description}
                          onChange={(e) => {
                            setTutionData({
                              ...TutionData,
                              Description: e.target.value,
                            });
                          }}
                        />
                      </div>

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
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-span-4 sticky top-5 h-fit space-y-5 ">
                <div className="border-2 border-dashed border-gray-500 p-5 rounded-md">
                  <div className="">
                    <h1 className="text-2xl text-text_color_secondary font-bold">
                      Selected Package
                    </h1>
                    <div className="mt-5">
                      <img
                        src={
                          Tution?.Picture
                            ? `${
                                process.env.REACT_APP_BACKEND_URL +
                                "/" +
                                Tution.Picture
                              }`
                            : "/assets/TH1.jpg"
                        }
                        alt=""
                        className="h-[200px] w-full object-contain"
                      />
                      <div className="mt-3">
                        <h1 className="font-bold text-xl capitalize text-hover_color">
                          {Tution?.Title}
                        </h1>
                        <p className="text-sm text-text_color_secondary_2">
                          {Tution?.Description}
                        </p>
                      </div>
                      <div className="mt-2 text-white rounded-md font-bold text-center bg-hover_color w-full py-2">
                        PKR {Tution?.Price}{" "}
                      </div>
                      <p className="text-sm text-text_color_secondary_2 text-center mt-1">
                        Capacity {Tution?.Capacity} (people)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Book;
