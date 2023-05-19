import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { MenuItem, Select, TextField } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { useDispatch } from "react-redux";
import { createAlert } from "../../Redux/Alert";

const BnadsPage = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [Tutions, setTutions] = useState([]);

  const [userType, setuserType] = useState("");
  const ChangeUserType = (event) => {
    setuserType(event.target.value);
  };
  const FetchTutions = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/find/bands`)
      .then((response) => {
        console.log(response);
        setTutions(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          createAlert({
            type: "error",
            message: error?.message
              ? error?.message
              : error?.response?.error
              ? error?.response?.error
              : "Something went wrong! Try again later",
          })
        );
      });
  };
  useEffect(() => {
    FetchTutions();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Header page="TeacherSearch" />
            <div className=" w-full">
              <div className="w-full z-10 sticky top-0 hidden md:block bg-main_color_2 py-3 px-5 ">
                <div className="w-full mx-auto">
                  {/* <h2 className="text-xl mb-1 font-bold">Filter Teachers</h2> */}
                  <div className="mt-1 grid grid-cols-5 gap-x-2 gap-y-2">
                    <TextField
                      id="standard-basic"
                      label="Teacher Name"
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      id="standard-basic"
                      label="City"
                      variant="outlined"
                      size="small"
                    />
                    <Select
                      // labelId="user-role-label"
                      id="user-role"
                      value={userType}
                      label="Who Are You"
                      onChange={ChangeUserType}
                      size="small"
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
                      size="small"
                    />
                    {/* <Button variant="outlined">Search</Button> */}
                    <button className="h-full px-4 bg-hover_color text-white font-semibold rounded-md w-full text-lg ">
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full mb-10 pr-5 relative">
                <div className="mt-5 w-full max-w-7xl mx-auto grid grid-cols-1 px-3 xl:px-5 2xl:px-0  lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5">
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
        </>
      )}
    </>
  );
};

function SearchItem({ tution }) {
  return (
    <div className="relative border-2 border-gray-200 rounded-md overflow-hidden">
      <Link to={`/photographers/${tution._id}`}>
        <img
          src={
            tution?.Picture
              ? `${process.env.REACT_APP_BACKEND_URL + "/" + tution.Picture}`
              : "/assets/TH1.jpg"
          }
          className="h-[150px] w-full object-cover cursor-pointer"
          alt=""
        />
      </Link>
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
            <h3 className="font-semibold text-sm capitalize">
              {tution?.Teacher[0]?.FirstName +
                " " +
                tution?.Teacher[0]?.LastName}
            </h3>
          </div>
        </div>
        <Link to={`/photographers/${tution._id}`}>
          <h1 className="font-[700] text-lg cursor-pointer text-hover_color hover:text-hover_color">
            {tution.Title}
          </h1>
        </Link>
        <p className="font-[400] text-sm cursor-pointer hover:text-hover_color">
          {tution.Description.length > 100
            ? tution.Description.substring(0, 100)
            : tution.Description}
        </p>
        {tution?.Rating ? (
          <p className="italic font-sm font-semibold text-search_color float-right">
            Not Rated Yet
          </p>
        ) : (
          <div className="mt-1 flex items-center">
            <AiFillStar size={18} className="text-search_color mr-1" />{" "}
            <p className="font-bold">5.0</p>
            <span className="block text-sm ml-1 text-text_color_secondary_2">
              (15)
            </span>
          </div>
        )}
      </div>
      <Link to={`/photographers/${tution._id}`}>
        <p className=" text-text_color_secondary_2 py-2 text-[16px] font-bold text-text_color_secondary text-center bg-hover_color text-white">
          PKR {tution?.Price}
        </p>
      </Link>
    </div>
  );
}
export default BnadsPage;
