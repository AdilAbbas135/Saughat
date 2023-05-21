import { MdCastForEducation, MdLocationOn } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import { Link } from "react-router-dom";
import DashboardUI from "../../../../Components/EventOrganizer/DashboardUI";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../../Redux/Alert";
const Profiles = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authtoken");
  const [loading, setloading] = useState(true);
  const [AllProfiles, setAllProfiles] = useState([]);
  const profiles = [
    {
      ProfilePicture: "/assets/teacher4.jpg",
      JobTitle: "John Doe",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
    },
    {
      ProfilePicture: "/assets/teacher4.jpg",
      JobTitle: "John Doe",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
    },
    {
      ProfilePicture: "/assets/teacher4.jpg",
      JobTitle: "John Doe",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
    },
    {
      ProfilePicture: "/assets/teacher4.jpg",
      JobTitle: "John Doe",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
    },
    {
      ProfilePicture: "/assets/teacher4.jpg",
      JobTitle: "John Doe",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
    },
  ];

  const FindSpouse = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/event-organizer/spouse`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setAllProfiles(result.data);
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
    FindSpouse();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <DashboardUI>
        <div className="">
          <div className="mt-2 mb-5 flex justify-between items-center">
            <h1 className="pb-1 w-fit h-fit text-2xl md:text-3xl font-bold font-sans uppercase border-b-2 border-search_color">
              Matching Profiles
            </h1>
          </div>
          {loading ? (
            <div className="min-h-[100px] w-full flex space-x-2 items-center justify-center">
              <CircularProgress disableShrink /> <h1>Loading..</h1>
            </div>
          ) : (
            <div className="mb-10 grid grid-cols-1 tablets:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 text-black ">
              {AllProfiles.length > 0 ? (
                AllProfiles.map((job, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white flex flex-col rounded-md overflow-hidden shadow-sm border border-gray-300"
                    >
                      <img
                        height={300}
                        width={300}
                        className="h-[250px] w-full object-cover"
                        src={
                          job.ProfilePicture
                            ? `${
                                process.env.REACT_APP_BACKEND_URL +
                                "/" +
                                job.ProfilePicture
                              }`
                            : "/assets/nightfall-logo.webp"
                        }
                        alt=""
                      />
                      <div className="detailContainer px-5 py-3 pb-5">
                        <h1 className="fpName text-2xl uppercase font-bold font-sans ">
                          {job.FirstName + " " + job.LastName}
                        </h1>
                        <p className="">
                          {job?.Description?.length > 100
                            ? job?.Description.substring(0, 100)
                            : job?.Description}
                          ...
                        </p>
                        <div className="mt-3 flex items-center text-[15px] space-x-1">
                          <MdLocationOn size={17} />
                          <p>{job?.Address ? job?.Address : "Not Found"}</p>
                        </div>
                        <div className="mt-3 flex items-center text-[15px] space-x-1">
                          <BsGenderAmbiguous size={17} />
                          <p>{job?.Gender ? "Male" : "Female"}</p>
                        </div>
                        <div className="mt-3 flex items-center text-[15px] space-x-1">
                          <MdCastForEducation size={17} />
                          <p>{job?.Qualifications}</p>
                        </div>

                        <Link
                          to={`/user/event-organizer/find-spouse/${job._id}`}
                        >
                          <button className="mt-4 w-full py-2 bg-hover_color text-white font-semibold rounded-sm">
                            View Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-red-500 italic">No Matching Profile Found</p>
              )}
            </div>
          )}
        </div>
      </DashboardUI>
    </>
  );
};

export default Profiles;
