import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../../../Components/Loader";
import { Button } from "@material-tailwind/react";
import DashboardUI from "../../../../Components/EventOrganizer/DashboardUI";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../../Redux/Alert";
import StripeCheckout from "react-stripe-checkout";

const SingleProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const Id = location.pathname.split("/").slice(-1);
  const [loading, setloading] = useState(true);
  const [Profile, setProfile] = useState({});
  const [ShowContact, setShowContact] = useState(false);
  const token = localStorage.getItem("authtoken");
  const stripeKey =
    "pk_test_51JGojQHB8vwABSSpHM2xByAZIfXbe0OIFVUmcrexiKkJmzHZAAj8457O7BuGXCiNkzQWWKpWsUiLQJj6ZTDXIpCS00RsoWj3HG";
  const [StripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  const FetchSingleSpouse = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/event-organizer/spouse/${Id}`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);

        setProfile(result.data);
        setloading(false);
      })
      .catch((error) => {
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
    FetchSingleSpouse();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      const Checkout = async () => {
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/checkout/payment`, {
            tokenId: StripeToken?.id,
            amount: 500,
          })
          .then((response2) => {
            setShowContact(true);
            dispatch(
              createAlert({
                type: "success",
                message: "Payement Made Successfully",
                options: {
                  position: "top-right",
                },
              })
            );
          })
          .catch((error) => {
            console.log(error);
            dispatch(
              createAlert({
                type: "error",
                message: "Something Went Wrong! Try Again",
                options: {
                  position: "top-right",
                },
              })
            );
          });
      };
      StripeToken && Checkout();
    } catch (error) {
      console.log(error);
    }
    //eslint-disable-next-line
  }, [StripeToken]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <DashboardUI>
            <div className="mb-10">
              <div className="mt-2 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-10 gap-10">
                  <div className="col-span-7">
                    <h1 className="font-[700] text-3xl text-hover_color uppercase">
                      {Profile?.FirstName + " " + Profile?.LastName}
                    </h1>
                    <div className="mt-5">
                      <img
                        src={
                          Profile?.ProfilePicture
                            ? `${
                                process.env.REACT_APP_BACKEND_URL +
                                "/" +
                                Profile?.ProfilePicture
                              }`
                            : "/assets/nightfall-logo.webp"
                        }
                        className="h-[500px] w-full object-cover rounded-md"
                        alt=""
                      />
                    </div>
                    <div className="mt-10">
                      <h1 className="text-2xl text-text_color_secondary pl-2 border-l-[6px] border-hover_color font-bold">
                        About {Profile?.FirstName + " " + Profile?.LastName}
                      </h1>
                      <p className="mt-5 font-normal text-[16px]">
                        {Profile?.Description}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 sticky top-5 h-fit space-y-5 mt-14 ">
                    <div className="border-2 border-dashed border-gray-500 p-5 rounded-md">
                      <div className="">
                        <h1 className="text-2xl text-text_color_secondary font-bold">
                          About {Profile?.FirstName + " " + Profile?.LastName}
                        </h1>
                        <div className="mt-5">
                          <div className=" flex items-center space-x-3">
                            <img
                              src={
                                Profile?.ProfilePicture
                                  ? `${
                                      process.env.REACT_APP_BACKEND_URL +
                                      "/" +
                                      Profile?.ProfilePicture
                                    }`
                                  : "/assets/nightfall-logo.webp"
                              }
                              className="h-[50px] w-[50px] object-cover rounded-full"
                              alt=""
                            />
                            <div className="">
                              <h1 className="font-bold text-xl capitalize">
                                {Profile?.FirstName + " " + Profile?.LastName}
                              </h1>
                              <h1 className="font-bold text-sm capitalize text-text_color_secondary_2">
                                User
                              </h1>
                            </div>
                          </div>

                          <div className="mt-5 ml-3">
                            <h1>
                              <b>Height:</b> {Profile?.Height}Ft
                            </h1>
                          </div>
                          <div className="mt-3 ml-3">
                            <h1>
                              <b>Nationality:</b> {Profile?.Nationality}
                            </h1>
                          </div>
                          <div className="mt-3 ml-3">
                            <h1>
                              <b>Religion:</b> {Profile?.Religion}
                            </h1>
                          </div>
                          <div className="mt-3 ml-3">
                            <h1>
                              <b>Siblings:</b> {Profile?.Siblings}
                            </h1>
                          </div>
                          <div className="mt-3 ml-3">
                            <h1>
                              <b>Gender:</b>{" "}
                              {Profile?.Gender ? "Male" : "Female"}
                            </h1>
                          </div>
                          <div className="mt-3 ml-3">
                            <h1>
                              <b>Age:</b> {Profile?.Age}
                            </h1>
                          </div>
                          <div className="mt-3 ml-3">
                            <h1>
                              <b>Qualifications:</b> {Profile?.Qualifications}
                            </h1>
                          </div>

                          <div className="mt-5">
                            {ShowContact ? (
                              <>
                                <div className="mt-3 ml-3">
                                  <h1>
                                    <b>Email:</b> {Profile?.Email}
                                  </h1>
                                </div>{" "}
                                <div className="mt-3 ml-3">
                                  <h1>
                                    <b>Phone No:</b> {Profile?.PhoneNo}
                                  </h1>
                                </div>
                              </>
                            ) : (
                              <div className="cursor-pointer">
                                <StripeCheckout
                                  name="Saughat Payment"
                                  // image="./assets/product-accessories-10.jpg"
                                  billingAddress
                                  shippingAddress
                                  description={`Your Total is $${5}`}
                                  amount={500}
                                  token={onToken}
                                  stripeKey={stripeKey}
                                  className="cursor-pointer"
                                >
                                  <Button className="mt-5 pointer-events-none bg-transparent border-2 border-text_color_secondary text-text_color_secondary shadow-none hover:shadow-none text-[15px] py-2 rounded-[4px] cursor-pointer">
                                    Pay $5 to See Contact Details
                                  </Button>
                                </StripeCheckout>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardUI>
        </>
      )}
    </>
  );
};

export default SingleProfile;
