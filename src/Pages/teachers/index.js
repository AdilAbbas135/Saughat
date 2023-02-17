import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { MenuItem, Select, TextField } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import { MdLocationOn } from "react-icons/md";

const TeachersPage = () => {
  const [userType, setuserType] = useState("");
  const ChangeUserType = (event) => {
    setuserType(event.target.value);
  };

  const loading = false;
  const Teachers = [
    {
      ProfilePicture: "/assets/teacher1.jpg",
      name: "Teacher 1",
      Subjects: ["Math", "Chemistry", "Physics"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Phalia",
      rating: false,
    },
    {
      ProfilePicture: "/assets/teacher2.jpg",
      name: "Teacher 2",
      Subjects: ["English", "Urdu"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Gujrat",
      rating: false,
    },
    {
      ProfilePicture: "/assets/teacher3.jpg",
      name: "Teacher 3",
      Subjects: ["Urdu", "Math", "Physics"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Gujrat",
      rating: false,
    },
    {
      ProfilePicture: "/assets/teacher4.jpg",
      name: "Teacher 4",
      Subjects: ["Math", "English", "Physics"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Gujrat",
    },
    {
      ProfilePicture: "/assets/teacher1.jpg",
      name: "Teacher 1",
      Subjects: ["Math", "Chemistry", "Physics"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Phalia",
      rating: false,
    },
    {
      ProfilePicture: "/assets/teacher2.jpg",
      name: "Teacher 2",
      Subjects: ["English", "Urdu"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Gujrat",
      rating: false,
    },
    {
      ProfilePicture: "/assets/teacher3.jpg",
      name: "Teacher 3",
      Subjects: ["Urdu", "Math", "Physics"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Gujrat",
      rating: false,
    },
    {
      ProfilePicture: "/assets/teacher4.jpg",
      name: "Teacher 4",
      Subjects: ["Math", "English", "Physics"],
      About:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorem, cum nihil tempore porro incidunt maiores sint numquam quod maxime!",
      city: "Gujrat",
    },
  ];
  return (
    <div>
      <Header page="TeacherSearch" />
      <div className=" w-full flex space-x-5">
        <div className="w-[35%] lg:w-[25%] h-screen sticky top-0 hidden md:block bg-main_color_2 py-2 pb-5 px-5 ">
          <div className="w-full mx-auto mt-5">
            <h2 className="text-3xl mb-1 font-bold">Filter Teachers</h2>
            <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-5">
              <TextField
                id="standard-basic"
                label="Teacher Name"
                variant="outlined"
                size="medium"
              />
              <TextField
                id="standard-basic"
                label="City"
                variant="outlined"
                size="medium"
              />
              <Select
                // labelId="user-role-label"
                id="user-role"
                value={userType}
                label="Who Are You"
                onChange={ChangeUserType}
                size="medium"
                className="w-full"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Gender
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"teacher"}>Female</MenuItem>
              </Select>
              <TextField
                id="standard-basic"
                label="Subjet"
                variant="outlined"
                size="medium"
              />
              {/* <Button variant="outlined">Search</Button> */}
              <button className=" py-4 px-4 bg-hover_color text-white font-semibold rounded-md w-full text-lg ">
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="w-full pr-5 relative">
          <div className="mt-5 w-full grid grid-cols-1 px-3 xl:px-5 2xl:px-0  lg:grid-cols-2 gap-x-3 gap-y-3">
            {!loading &&
              Teachers.map((teacher, index) => (
                <div key={index}>
                  <SearchItem key={index} teacher={teacher} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function SearchItem({ teacher }) {
  return (
    <div className="relative border-2 border-gray-300 w-full flex flex-col tablets:flex-row items-center space-x-4 p-2">
      <div className="w-full tablets:w-4/6 md:w-4/6">
        <img
          height={500}
          width={500}
          className="w-full h-[300px] object-cover"
          src={teacher.ProfilePicture}
          alt=""
        />
      </div>
      <div className="flex flex-col w-full space-y-2">
        {/* Teacher Rating */}
        <div className="absolute right-3 top-3">
          {teacher.rating ? (
            <div className="flex justify-around space-x-2">
              <h3 className="font-bold">Excellent</h3>
              <button className="bg-main_bg_color p-2 text-white font-semibold rounded-md">
                8.9
              </button>
            </div>
          ) : (
            <h3 className="font-bold text-red-400">Not Rated Yet</h3>
          )}
        </div>
        <h1 className="text-3xl font-bold text-hover_color font-sans">
          {teacher.name}
        </h1>

        <div className="flex space-x-2">
          {teacher.Subjects.map((subject, index) => {
            return (
              <span
                key={index}
                className="mt-2 text-sm bg-main_color_2 font-semibold text-black w-fit py-1 px-3 rounded-sm"
              >
                {subject}
              </span>
            );
          })}
        </div>
        <div className="pt-1 flex items-center text-[15px] space-x-1">
          <MdLocationOn size={20} />
          <p className="text-md">{teacher.city}</p>
        </div>
        <p className="pt-1 pb-3 text-md text-justify">{teacher.About}</p>
        <button className="py-2 px-10 bg-hover_color text-white font-bold rounded-sm w-fit">
          Visit Profile
        </button>
      </div>
    </div>
  );
}
export default TeachersPage;
