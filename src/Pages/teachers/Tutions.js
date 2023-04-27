import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { MenuItem, Select, TextField } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const TutionsPage = () => {
  const [loading, setloading] = useState(true);
  const [Tutions, setTutions] = useState([]);

  const [userType, setuserType] = useState("");
  const ChangeUserType = (event) => {
    setuserType(event.target.value);
  };
  const FetchTutions = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/find/tutions`)
      .then((response) => {
        console.log(response);
        setTutions(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    FetchTutions();
  }, []);

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
          <div className="mt-5 w-full grid grid-cols-1 px-3 xl:px-5 2xl:px-0  lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-3">
            {!loading &&
              Tutions.map((tution, index) => (
                <div key={index}>
                  <SearchItem key={index} tution={tution} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function SearchItem({ tution }) {
  return (
    <div className="relative border-2 border-gray-200 rounded-md overflow-hidden">
      <img
        src={
          tution?.Picture
            ? `${process.env.REACT_APP_BACKEND_URL + "/" + tution.Picture}`
            : "/assets/TH1.jpg"
        }
        className="h-[150px] w-full object-cover"
        alt=""
      />
      <div className="p-5">
        <div className="mb-3 flex items-center space-x-2">
          <img
            src={
              tution?.Picture
                ? `${process.env.REACT_APP_BACKEND_URL + "/" + tution.Picture}`
                : "/assets/TH1.jpg"
            }
            className="h-[40px] w-[40px] object-cover rounded-full"
            alt=""
          />
          <div>
            <h3 className="font-semibold">
              {tution?.Teacher[0]?.FirstName +
                " " +
                tution?.Teacher[0]?.LastName}
            </h3>
          </div>
        </div>
        <h1 className="font-[500]">{tution.Title}</h1>
      </div>
    </div>
  );
}
export default TutionsPage;
