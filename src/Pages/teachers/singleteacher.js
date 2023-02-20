import { Button } from "@material-tailwind/react";
import { Rating } from "@mui/material";
import React from "react";
import Header from "../../Components/Header/Header";
import { RxPerson } from "react-icons/rx";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";
import Footer from "../../Components/Footer/Footer";

const SingleTeacher = () => {
  const PersonalDetails = [
    {
      name: "From",
      desc: "Phalia, Punjab , Pakistan",
      icon: <GoLocation />,
    },
    {
      name: "Member Since",
      desc: "october 26,2001",
      icon: <RxPerson />,
    },
    {
      name: "Email",
      desc: "hafsa@dar.uog.edu.pk",
      icon: <AiOutlineMail />,
    },
    {
      name: "Gender",
      desc: "Female",
      icon: <BsGenderAmbiguous />,
    },
  ];

  const Education = [
    { startin_year: 2001, ending_year: 2005, degree: "BS MATH" },
    {
      startin_year: 2006,
      ending_year: 2010,
      degree: "MS SOFTWARE ENGINEERING",
    },
  ];

  const tution_services = [
    {
      name: "Matric",
      subjects: ["Math", "Physics", "Chemistry"],
      fee: 1500,
    },
    {
      name: "Inter",
      subjects: ["English", "Math", "Physics", "Chemistry"],
      fee: 3000,
    },
    {
      name: "Matric",
      subjects: ["Math", "Physics", "Chemistry"],
      fee: 1500,
    },
    {
      name: "Inter",
      subjects: ["English", "Math", "Physics", "Chemistry"],
      fee: 3000,
    },
  ];
  return (
    <div className="bg-gray-100">
      <Header page="singleteacher" />
      <div className="pb-10">
        <div className="w-full mx-auto max-w-7xl bg-white pb-10 rounded-b-md">
          <div className="h-[350px] w-full">
            <img
              src="/assets/profile-bg.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="bg-white flex items-center justify-between px-5 py-3 rounded-b-md">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/avatar-18.jpg"
                className="h-[110px] w-[110px] object-cover rounded-full border-[5px] border-gray-200"
                alt=""
              />
              <div>
                <h1 className="font-bold text-text_color text-2xl">
                  Hafsa Dar
                </h1>
                <h1 className="font-semibold text-text_color_secondary_2">
                  Lecturer at UOG
                </h1>
              </div>
            </div>
            <div>
              <h2 className="text-text_color_secondary_2 font-semibold">
                Followers
              </h2>
              <h3 className="text-text_color_secondary font-bold text-2xl">
                512
              </h3>
            </div>
            <div>
              <h2 className="text-text_color_secondary_2">Overall Rating</h2>
              <Rating name="read-only" value={2.5} readOnly />
            </div>

            <div className="flex space-x-3">
              <Button
                on
                className="bg-hover_color px-5 shadow-none hover:shadow-none hover:bg-main_bg_color transition-all"
              >
                Message
              </Button>
              <Button className="bg-[#70C4CF] px-5 shadow-none hover:shadow-none">
                Follow
              </Button>
            </div>
          </div>
          <div className="mt-5 bg-white rounded-sm px-5 grid grid-cols-10 gap-x-4 gap-y-3">
            <div className="col-span-3 p-5 h-fit border-[2px] border-gray-100 rounded-md">
              <h1 className="font-semibold text-text_color text-lg mb-5">
                Personal Details:
              </h1>

              {PersonalDetails.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center space-x-1">
                      <p className="text-hover_color text-lg">{elem.icon}</p>
                      <h2 className="font-[500] text-text_color_secondary text-sm">
                        {elem.name}
                      </h2>
                    </div>
                    <h2 className="font-bold font-sans  text-text_color_secondary_2">
                      {elem.desc}
                    </h2>
                  </div>
                );
              })}
            </div>
            <div className="col-span-7 p-5 border-[2px] border-gray-100 rounded-md">
              <div>
                <h1 className="font-semibold text-text_color text-lg mb-5">
                  About{" "}
                  <span className="text-hover_color font-semibold">
                    Hafsa Dar
                  </span>
                </h1>
                <p className="space-y-2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iusto officia cum asperiores, eum praesentium dolor magni
                    mollitia porro illo ut deleniti molestiae itaque at est
                    atque quasi esse facere totam! Fugit, ad. Facilis,
                    aspernatur voluptatum animi, optio, laudantium incidunt
                    delectus sapiente impedit ex perferendis sed? Totam
                    necessitatibus doloremque commodi amet.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis, cum?
                  </p>
                </p>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-text_color text-lg mb-5">
                  Education
                </h1>
                {Education.map((elem, index) => {
                  return (
                    <div key={index} className="flex flex-col mb-3">
                      <h1 className="text-text_color_secondary_2">
                        {elem.startin_year} - {elem.ending_year}
                      </h1>
                      <p className="font-semibold text-text_color_secondary">
                        {elem.degree}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-5 px-10">
            <h1 className="font-semibold text-text_color text-2xl mb-5 pl-1 border-l-[5px] border-hover_color">
              Tution Servies
            </h1>
            <div className="grid grid-cols-4 gap-3 gap-y-3">
              {tution_services.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className=" border-2 border-gray-100 p-5 rounded-md transition-all hover:shadow-md"
                  >
                    <h1 className="font-semibold text-hover_color text-xl mb-3">
                      {elem.name}
                    </h1>
                    {elem.subjects.map((elem2, index2) => {
                      return (
                        <div
                          key={index2}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src="/assets/icons8-checked-checkbox-96.png"
                            alt=""
                            className="h-[20px] w-[20px]"
                          />
                          <h1>{elem2}</h1>
                        </div>
                      );
                    })}
                    <p className="my-3 py-2 w-fit px-3 bg-[#d1ecf1] rounded-md text-sm">
                      Fee{" "}
                      <span className="font-bold text-hover_color">
                        {elem.fee}
                      </span>{" "}
                      /Per Month
                    </p>

                    <Button className="px-5 bg-hover_color shadow-none hover:shadow-none py-2 font-semibold rounded-md">
                      Hire Now
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleTeacher;
