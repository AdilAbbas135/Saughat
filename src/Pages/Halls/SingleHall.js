import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Loader from "../../Components/Loader";
import { TiTick } from "react-icons/ti";
import { Button } from "@material-tailwind/react";
import Footer from "../../Components/Footer/Footer";

const SingleHall = () => {
  const location = useLocation();
  const HallId = location.pathname.split("/").slice(-1);
  const [loading, setloading] = useState(true);
  const [Tution, setTution] = useState({});

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
  useEffect(() => {
    FetchHall();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-10">
            <Header page="SingleTution" />
            <div className="mt-10 w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-10 gap-10">
                <div className="col-span-7">
                  <h1 className="font-[700] text-3xl text-hover_color uppercase">
                    {Tution.Title}
                  </h1>
                  {/* <div className="mt-2 flex items-center space-x-2">
                    <img
                      src={
                        Tution?.Teacher[0]?.ProfilePicture
                          ? Tution?.Teacher[0]?.ProfilePicture
                          : "/assets/user.png"
                      }
                      className="h-[40px] w-[40px] rounded-full"
                      alt=""
                    />
                    <h2 className="text-text_color_secondary font-semibold capitalize text-[16px]">
                      {Tution?.Teacher[0]?.FirstName +
                        " " +
                        Tution?.Teacher[0]?.LastName}
                    </h2>
                  </div> */}
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
                      className="h-[500px] w-full object-cover rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="mt-10">
                    <h1 className="text-2xl text-text_color_secondary pl-2 border-l-[6px] border-hover_color font-bold">
                      About This Service
                    </h1>
                    <p className="mt-5 font-normal text-[16px]">
                      {Tution.Description}
                    </p>
                  </div>
                  <div className="mt-10">
                    <Link to={`/halls/${Tution._id}/book`}>
                      <Button className="w-full text-[15px] rounded-md bg-hover_color shadow-none hover:shadow-none">
                        Book Now
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-10">
                    <h1 className="text-2xl text-text_color_secondary pl-2 border-l-[6px] border-hover_color font-bold">
                      About Hall Manager
                    </h1>
                    <div className="mt-5 flex items-center justify-between space-x-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            Tution?.Teacher[0]?.ProfilePicture
                              ? Tution?.Teacher[0]?.ProfilePicture
                              : "/assets/user.png"
                          }
                          className="h-[90px] w-[90px] object-cover rounded-full"
                          alt=""
                        />
                        <div className="">
                          <h1 className="font-bold text-xl capitalize">
                            {Tution?.Teacher[0]?.FirstName +
                              " " +
                              Tution?.Teacher[0]?.LastName}
                          </h1>
                          <h1 className="font-bold text-sm capitalize text-text_color_secondary_2">
                            Mobile Developer
                          </h1>
                        </div>
                      </div>
                      <Button className="mt-2 bg-transparent border-2 border-text_color_secondary text-text_color_secondary shadow-none hover:shadow-none text-[15px] py-2 rounded-[4px]">
                        Contact Me
                      </Button>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h1 className="text-2xl text-text_color_secondary pl-2 border-l-[6px] border-hover_color font-bold">
                      Reviews:
                    </h1>
                    <p>Yahaan pe section daalna hai</p>
                  </div>
                </div>
                <div className="col-span-3 sticky top-5 h-fit space-y-5 ">
                  {/* <div className="border-2 border-dashed border-gray-500 p-5 rounded-md">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-[600]">Service Includes</h1>
                      <h1 className="text-xl text-center text-text_color_secondary_2">
                        PKR{" "}
                        <span className="font-bold text-hover_color">
                          {Tution.Fee}
                        </span>
                      </h1>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <TiTick size={20} className="text-green-500 mr-2" />
                        <h2 className="font-[600] text-text_color_secondary_2">
                          English
                        </h2>
                      </div>
                      <div className="flex items-center">
                        <TiTick size={20} className="text-green-500 mr-2" />
                        <h2 className="font-[600] text-text_color_secondary_2">
                          English
                        </h2>
                      </div>{" "}
                      <div className="flex items-center">
                        <TiTick size={20} className="text-green-500 mr-2" />
                        <h2 className="font-[600] text-text_color_secondary_2">
                          English
                        </h2>
                      </div>{" "}
                      <div className="flex items-center">
                        <TiTick size={20} className="text-green-500 mr-2" />
                        <h2 className="font-[600] text-text_color_secondary_2">
                          English
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <a
                        href={`mailto:${Tution.Teacher[0].Email}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button className="mx-auto mt-5 font-semibold bg-hover_color text-white rounded-[4px] text-[15px] shadow-none hover:shadow-none">
                          Contact Teacher
                        </Button>
                      </a>
                    </div>
                  </div> */}

                  <div className="border-2 border-dashed border-gray-500 p-5 rounded-md">
                    <div className="">
                      <h1 className="text-2xl text-text_color_secondary font-bold">
                        About Hall Manager
                      </h1>
                      <div className="mt-5">
                        <div className=" flex items-center space-x-3">
                          <img
                            src={
                              Tution?.Teacher[0]?.ProfilePicture
                                ? Tution?.Teacher[0]?.ProfilePicture
                                : "/assets/user.png"
                            }
                            className="h-[50px] w-[50px] object-cover rounded-full"
                            alt=""
                          />
                          <div className="">
                            <h1 className="font-bold text-xl capitalize">
                              {Tution?.Teacher[0]?.FirstName +
                                " " +
                                Tution?.Teacher[0]?.LastName}
                            </h1>
                            <h1 className="font-bold text-sm capitalize text-text_color_secondary_2">
                              Mobile Developer
                            </h1>
                          </div>
                        </div>

                        <Button className="mt-5 bg-transparent border-2 border-text_color_secondary text-text_color_secondary shadow-none hover:shadow-none text-[15px] py-2 rounded-[4px]">
                          Contact Me
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Link to={`/halls/${Tution._id}/book`}>
                    <Button className="w-full text-[15px] rounded-md bg-hover_color shadow-none hover:shadow-none">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default SingleHall;
