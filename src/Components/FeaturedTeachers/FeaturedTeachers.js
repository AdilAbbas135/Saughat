import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const FeaturedTeachers = () => {
  const [Tutions, setTutions] = useState([]);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const FetchTutions = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/find/halls`)
      .then((response) => {
        console.log(response);
        setTutions(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        // dispatch(
        //   createAlert({
        //     type: "error",
        //     message: error?.message
        //       ? error?.message
        //       : error?.response?.error
        //       ? error?.response?.error
        //       : "Something went wrong! Try again later",
        //   })
        // );
      });
  };
  useEffect(() => {
    FetchTutions();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="px-5 md:px-0">
        <div className="mb-5 flex justify-between items-center">
          <h1 className="pb-1 w-fit h-fit text-2xl md:text-3xl font-bold font-sans uppercase border-b-2 border-search_color">
            Our Top Rated Halls -
          </h1>
          <Link to={"/halls"}>
            <button className="hidden md:block px-10 py-2 bg-hover_color text-white font-semibold rounded-sm">
              View All
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 tablets:grid-cols-2  md:grid-cols-4 gap-x-5 gap-y-5">
          {loading ? (
            <div className="min-h-[100px] w-full flex space-x-2 items-center justify-center">
              <CircularProgress disableShrink /> <h1>Loading..</h1>
            </div>
          ) : (
            Tutions.slice(0, 4).map((teacher, index) => (
              <div
                key={index}
                className="fp-container-item flex flex-col rounded-md overflow-hidden border-2 hover:shadow-md transition-all"
              >
                <img
                  height={300}
                  width={500}
                  className="h-[250px] md:h-[300px] w-full object-cover"
                  src={
                    teacher?.Picture
                      ? `${
                          process.env.REACT_APP_BACKEND_URL +
                          "/" +
                          teacher.Picture
                        }`
                      : "/assets/TH1.jpg"
                  }
                  alt=""
                />
                <div className="detailContainer px-3 py-3">
                  <h1 className="fpName text-2xl uppercase font-bold font-sans ">
                    {teacher.Title}
                  </h1>
                  <p className="text-text_color_secondary_2 text-sm mb-3">
                    {teacher?.Description.length > 150 ? (
                      <span>{teacher.Description.substring(0, 150)}...</span>
                    ) : (
                      teacher.Description
                    )}
                  </p>
                  {/* <div className="mt-2 flex space-x-1 flex-wrap">
                    {teacher.Subjects.map((subject, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-main_color_2 px-4 py-1 rounded-md"
                        >
                          <p className="text-sm">{subject}</p>
                        </div>
                      );
                    })}
                  </div> */}
                  <Link to={`/halls/${teacher._id}`}>
                    <button className="mt-4 w-full py-2 bg-hover_color text-white font-[500] rounded-[4px]">
                      View Hall
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedTeachers;
