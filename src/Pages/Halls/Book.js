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
import { Radio } from "antd";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StripeCheckout from "react-stripe-checkout";
import { useRef } from "react";

const Book = () => {
  const session = useSelector((state) => state.session.session);
  const location = useLocation();
  const dispatch = useDispatch();
  const CheckoutbtnRef = useRef();
  const HallId = location.pathname.split("/")[2];
  const [loading, setloading] = useState(true);
  const [Tution, setTution] = useState({});
  const [addLoading, setaddLoading] = useState(false);
  const [TutionData, setTutionData] = useState({});
  const token = localStorage.getItem("authtoken");
  const [BookingStep, setBookingStep] = useState(1);
  const [SelectedStage, setSelectedStage] = useState([]);
  const [EndingDate, setEndingDate] = useState();
  const stripeKey =
    "pk_test_51JGojQHB8vwABSSpHM2xByAZIfXbe0OIFVUmcrexiKkJmzHZAAj8457O7BuGXCiNkzQWWKpWsUiLQJj6ZTDXIpCS00RsoWj3HG";
  const [StripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  const ThemeDesign = [
    {
      name: "Theme 1",
      picture: "/assets/theme 1.jpg",
      value: "Theme1",
      price: "3000",
    },
    {
      name: "Theme 2",
      picture: "/assets/theme 2.jpg",
      value: "Theme2",
      price: "4000",
    },
    {
      name: "Theme 3",
      picture: "/assets/theme 3.jpeg",
      value: "Theme3",
      price: "2000",
    },
    {
      name: "Theme 4",
      picture: "/assets/theme 4.jpeg",
      value: "Theme4",
      price: "2500",
    },
    {
      name: "Theme 5",
      picture: "/assets/theme 6.jpeg",
      value: "Theme5",
      price: "3000",
    },
  ];
  const Curtains = [
    {
      name: "Curtain 1",
      picture: "/assets/Curtain 1.jpg",
      value: "Curtain1",
      price: "3000",
    },
    {
      name: "Curtain 2",
      picture: "/assets/Curtain 2.jpg",
      value: "Curtain2",
      price: "2000",
    },
    {
      name: "Curtain 3",
      picture: "/assets/Curtain 3.jpeg",
      value: "Curtain3",
      price: "4000",
    },
    {
      name: "Curtain 4",
      picture: "/assets/Curtain 4.jpeg",
      value: "Curtain4",
      price: "5000",
    },
    {
      name: "Curtain 5",
      picture: "/assets/Curtain 5.jpeg",
      value: "Curtain5",
      price: "3000",
    },
    // { name: "Curtain 6", picture: "/assets/Curtain 6.jpg", value: "Curtain6" },
  ];
  const Lights = [
    {
      name: "Light 1",
      picture: "/assets/Light 1.jpeg",
      value: "Light1",
      price: "3000",
    },
    {
      name: "Light 2",
      picture: "/assets/Light 2.jpeg",
      value: "Light2",
      price: "2000",
    },
    {
      name: "Light 3",
      picture: "/assets/Light 3.jpeg",
      value: "Light3",
      price: "1000",
    },
    {
      name: "Light 4",
      picture: "/assets/Light 4.jpg",
      value: "Light4",
      price: "3000",
    },
    {
      name: "Light 5",
      picture: "/assets/Light 5.jpg",
      value: "Light5",
      price: "6000",
    },
  ];
  const Flowers = [
    {
      name: "Flowers 2",
      picture: "/assets/flower 2.jpg",
      value: "Flowers2",
      price: "3000",
    },
    {
      name: "Flowers 1",
      picture: "/assets/flower 1.jpg",
      value: "Flowers1",
      price: "2000",
    },
    {
      name: "Flowers 3",
      picture: "/assets/flower 3.jpeg",
      value: "Flowers3",
      price: "5000",
    },
    {
      name: "Flowers 4",
      picture: "/assets/flower 4.jpeg",
      value: "Flowers4",
      price: "1000",
    },
    {
      name: "Flowers 5",
      picture: "/assets/flower 5.webp",
      value: "Flowers5",
      price: "3000",
    },
  ];

  const FetchHall = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/find/halls/singleHall?HallId=${HallId}`
      )
      .then((response) => {
        console.log("hall booking detail with bookings are given below");
        console.log(response);
        setTution(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const disableBookedDays = (date) => {
    // console.log("the date that is passing inside is")
    return Tution?.Bookings?.some(
      (disabledDate) =>
        new Date(disabledDate.Date).getDate() === new Date(date).getDate() &&
        new Date(disabledDate.Date).getMonth() === new Date(date).getMonth() &&
        new Date(disabledDate.Date).getFullYear() ===
          new Date(date).getFullYear()
    );
  };

  const AddBooking = async () => {
    setaddLoading(true);
    const data = {
      TutionData,
      HallDetail: Tution,
      userDetail: session,
      SelectedStage,
      EndingDate,
    };
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/booking/hall`, data, {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);

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

  const ChangeThemeDesign = (e) => {
    setSelectedStage({
      ...SelectedStage,
      Theme: ThemeDesign.find((stage) => {
        return stage.value === e.target.value;
      }),
    });
  };
  const ChangeCurtainsDesign = (e) => {
    setSelectedStage({
      ...SelectedStage,
      Curtain: Curtains.find((stage) => {
        return stage.value === e.target.value;
      }),
    });
  };
  const ChangeLightsDesign = (e) => {
    setSelectedStage({
      ...SelectedStage,
      Lights: Lights.find((stage) => {
        return stage.value === e.target.value;
      }),
    });
  };
  const ChangeFlowersDesign = (e) => {
    setSelectedStage({
      ...SelectedStage,
      Flowers: Flowers.find((stage) => {
        return stage.value === e.target.value;
      }),
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
            <div className="mt-5">
              {BookingStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <h1 className="text-xl text-hover_color font-bold text-center uppercase">
                      Choose Theme Design
                    </h1>
                    <span className="block h-1 w-10 bg-hover_color rounded-md mx-auto"></span>
                    <Radio.Group
                      buttonStyle="outlined"
                      onChange={ChangeThemeDesign}
                      defaultValue={ThemeDesign[0].name}
                      className="w-full mt-5 grid grid-cols-5 gap-4"
                    >
                      {ThemeDesign.map((stage, index) => {
                        return (
                          <Radio.Button
                            key={index}
                            value={stage.value}
                            style={{ height: "fit-content" }}
                          >
                            <div className=" py-4 h-fit-content w-full flex flex-col items-center justify-center rounded-md">
                              <img
                                src={stage.picture}
                                className="h-[250px] w-auto object-contain"
                                alt=""
                              />
                              <h2 className="mt-2 text-sm font-semibold text-[18px] text-center">
                                {stage.name}
                              </h2>
                              <span className="mt-2 bg-main_bg_color text-white w-full py-1 text-[16px] font-bold text-center rounded-md">
                                Rs. {stage.price}
                              </span>
                            </div>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </div>
                  <div>
                    <h1 className="text-xl text-hover_color font-bold text-center uppercase">
                      Choose Curatin Design
                    </h1>
                    <span className="block h-1 w-10 bg-hover_color rounded-md mx-auto"></span>
                    <Radio.Group
                      buttonStyle="outlined"
                      onChange={ChangeCurtainsDesign}
                      defaultValue={Curtains[0].name}
                      className="w-full mt-5 grid grid-cols-5 gap-4"
                    >
                      {Curtains.map((stage, index) => {
                        return (
                          <Radio.Button
                            key={index}
                            value={stage.value}
                            style={{ height: "fit-content" }}
                          >
                            <div className=" py-4 h-fit-content w-full flex flex-col items-center justify-center rounded-md">
                              <img
                                src={stage.picture}
                                className="h-[250px] w-auto object-contain"
                                alt=""
                              />
                              <h2 className="mt-2 text-sm font-semibold text-[18px] text-center">
                                {stage.name}
                              </h2>
                              <span className="mt-2 bg-main_bg_color text-white w-full py-1 text-[16px] font-bold text-center rounded-md">
                                Rs. {stage.price}
                              </span>
                            </div>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </div>
                  <div>
                    <h1 className="text-xl text-hover_color font-bold text-center uppercase">
                      Choose Lights Design
                    </h1>
                    <span className="block h-1 w-10 bg-hover_color rounded-md mx-auto"></span>
                    <Radio.Group
                      buttonStyle="outlined"
                      onChange={ChangeLightsDesign}
                      defaultValue={Lights[0].name}
                      className="w-full mt-5 grid grid-cols-5 gap-4"
                    >
                      {Lights.map((stage, index) => {
                        return (
                          <Radio.Button
                            key={index}
                            value={stage.value}
                            style={{ height: "fit-content" }}
                          >
                            <div className=" py-4 h-fit-content w-full flex flex-col items-center justify-center rounded-md">
                              <img
                                src={stage.picture}
                                className="h-[250px] w-auto object-contain"
                                alt=""
                              />
                              <h2 className="mt-2 text-sm font-semibold text-[18px] text-center">
                                {stage.name}
                              </h2>
                              <span className="mt-2 bg-main_bg_color text-white w-full py-1 text-[16px] font-bold text-center rounded-md">
                                Rs. {stage.price}
                              </span>
                            </div>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </div>
                  <div>
                    <h1 className="text-xl text-hover_color font-bold text-center uppercase">
                      Choose Flowers Design
                    </h1>
                    <span className="block h-1 w-10 bg-hover_color rounded-md mx-auto"></span>
                    <Radio.Group
                      buttonStyle="outlined"
                      onChange={ChangeFlowersDesign}
                      defaultValue={Flowers[0].name}
                      className="w-full mt-5 grid grid-cols-5 gap-4"
                    >
                      {Flowers.map((stage, index) => {
                        return (
                          <Radio.Button
                            key={index}
                            value={stage.value}
                            style={{ height: "fit-content" }}
                          >
                            <div className=" py-4 h-fit-content w-full flex flex-col items-center justify-center rounded-md">
                              <img
                                src={stage.picture}
                                className="h-[250px] w-auto object-contain"
                                alt=""
                              />
                              <h2 className="mt-2 text-sm font-semibold text-[18px] text-center">
                                {stage.name}
                              </h2>
                              <span className="mt-2 bg-main_bg_color text-white w-full py-1 text-[16px] font-bold text-center rounded-md">
                                Rs. {stage.price}
                              </span>
                            </div>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    // disabled={addLoading ? true : false}
                    onClick={(e) => {
                      // console.log("button is clcked");
                      setBookingStep(2);
                    }}
                    className="mt-5 w-fit mx-auto px-5 text-[16px] bg-hover_color flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </Button>
                </div>
              )}
              {BookingStep === 2 && (
                <>
                  <div className="grid grid-cols-10 gap-10">
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
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  disablePast={true}
                                  label="Ending Date"
                                  value={EndingDate}
                                  onChange={(newValue) => {
                                    setEndingDate(newValue);
                                  }}
                                  shouldDisableDate={disableBookedDays}
                                  className="w-full"
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                  slotProps={{
                                    textField: {
                                      required: true,
                                    },
                                  }}
                                />
                              </LocalizationProvider>
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
                              <StripeCheckout
                                name="Saughat Payment"
                                // image="./assets/product-accessories-10.jpg"
                                billingAddress
                                shippingAddress
                                description={`Your Total is Rs. ${
                                  Number(Tution?.Price) +
                                  Number(SelectedStage.Flowers.price) +
                                  Number(SelectedStage.Lights.price) +
                                  Number(SelectedStage.Curtain.price) +
                                  Number(SelectedStage.Theme.price)
                                }`}
                                amount={
                                  Number(Tution?.Price) +
                                  Number(SelectedStage.Flowers.price) +
                                  Number(SelectedStage.Lights.price) +
                                  Number(SelectedStage.Curtain.price) +
                                  Number(SelectedStage.Theme.price)
                                }
                                token={onToken}
                                stripeKey={stripeKey}
                                className="cursor-pointer"
                              >
                                <Button ref={CheckoutbtnRef}>Pay Amount</Button>
                              </StripeCheckout>
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
                            <h1 className="font-bold text-xl capitalize text-text_color_secondary_2">
                              {Tution?.Title}
                            </h1>
                            {/* <div className="mt-3">
                              <p className="text-sm text-text_color_secondary_2">
                                {Tution?.Description}
                              </p>
                            </div>
                            <div className="mt-2 text-white rounded-md font-bold text-center bg-hover_color w-full py-2">
                              PKR {Tution?.Price}{" "}
                            </div>
                            <p className="text-sm text-text_color_secondary_2 text-center mt-1">
                              Capacity {Tution?.Capacity} (people)
                            </p> */}
                            <h1 className="mt-2 font-bold text-xl text-hover_color">
                              Bill Details:
                            </h1>
                            <span className="h-1 w-10 bg-hover_color block rounded-md"></span>
                            <div className="mt-3 w-full space-y-1">
                              <div className="flex items-center justify-between font-semibold">
                                <p>Hall</p>
                                <p className="text-hover_color">
                                  PKR {Tution?.Price}
                                </p>
                              </div>
                              <div className="flex items-center justify-between font-semibold">
                                <p>Theme</p>
                                <p className="text-hover_color">
                                  PKR {SelectedStage.Theme.price}
                                </p>
                              </div>
                              <div className="flex items-center justify-between font-semibold">
                                <p>Curtain</p>
                                <p className="text-hover_color">
                                  PKR {SelectedStage.Curtain.price}
                                </p>
                              </div>
                              <div className="flex items-center justify-between font-semibold">
                                <p>Lights</p>
                                <p className="text-hover_color">
                                  PKR {SelectedStage.Lights.price}
                                </p>
                              </div>
                              <div className="flex items-center justify-between font-semibold">
                                <p>Flowers</p>
                                <p className="text-hover_color">
                                  PKR {SelectedStage.Flowers.price}
                                </p>
                              </div>
                            </div>
                            <h1 className="font-bold text-xl text-hover_color">
                              Total:
                            </h1>
                            <span className="mt-2 h-1 w-10 bg-hover_color block rounded-md"></span>
                            <div className="mt-2 text-white rounded-md font-bold text-center bg-hover_color w-full py-2 opacity-50 ">
                              Total Bill:{" "}
                              {Number(Tution?.Price) +
                                Number(SelectedStage.Flowers.price) +
                                Number(SelectedStage.Lights.price) +
                                Number(SelectedStage.Curtain.price) +
                                Number(SelectedStage.Theme.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-4 gap-5">
                    <div className="h-fit border-2 border-dashed border-gray-500 p-5 rounded-md">
                      <h1 className="text-xl text-text_color_secondary font-bold">
                        Selected Theme Design
                      </h1>
                      <div className="mt-5">
                        <img
                          src={SelectedStage.Theme.picture}
                          alt=""
                          className="h-[200px] w-full object-contain"
                        />
                        <div className="mt-3">
                          <h1 className="font-bold text-xl capitalize text-hover_color">
                            {SelectedStage.Theme.name}
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
                          src={SelectedStage.Curtain.picture}
                          alt=""
                          className="h-[200px] w-full object-contain"
                        />
                        <div className="mt-3">
                          <h1 className="font-bold text-xl capitalize text-hover_color">
                            {SelectedStage.Curtain.name}
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
                          src={SelectedStage.Lights.picture}
                          alt=""
                          className="h-[200px] w-full object-contain"
                        />
                        <div className="mt-3">
                          <h1 className="font-bold text-xl capitalize text-hover_color">
                            {SelectedStage.Lights.name}
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
                          src={SelectedStage.Flowers.picture}
                          alt=""
                          className="h-[200px] w-full object-contain"
                        />
                        <div className="mt-3">
                          <h1 className="font-bold text-xl capitalize text-hover_color">
                            {SelectedStage.Flowers.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Book;
