import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createAlert } from "../../Redux/Alert";

const GeneralTab = () => {
  const dispatch = useDispatch();
  const [StudentValues, setStudentValues] = useState(
    useSelector((state) => state?.EventOrganizerDashboard?.EventOrganizer)
  );
  const [Errors, setErrors] = useState({
    SubjectError: false,
    FileError: false,
  });
  const Fileref = useRef();
  const [File, setFile] = useState({});
  const [Preview, setPreview] = useState(false);

  const ShowPreviewImage = (event) => {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      setErrors({ ...Errors, FileError: false });
      setPreview(true);
      setFile(event.target.files[0]);
      //   preview.style.display = "block";
    }
  };

  const handleSubmitAccount = async () => {
    const token = localStorage.getItem("authtoken");
    let Data = new FormData();
    Data.append("file", File);
    Data.append("Data", JSON.stringify(StudentValues));

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/event-organizer/updateprofile`,
        Data,
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          createAlert({
            type: "success",
            message: "Profile Updated Successfully",
            options: {
              position: "top-right",
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
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

  useEffect(() => {}, []);
  return (
    <>
      {/* <ToastContainer /> */}
      <div className=" mx-4 rounded-md sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitAccount();
          }}
        >
          <div className="mt-5 mb-10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900 border-l-4 border-hover_color pl-2">
                Your Profile
              </h3>
              <h3 className="text-lg font-semibold leading-6 text-text_color_secondary_2">
                <Link to={"/"}>Home</Link> / Profile
              </h3>
            </div>
            <div className="overflow-hidden sm:rounded-md">
              <div className="bg-white py-10 px-4 md:px-10 ">
                <div className="mb-10">
                  <h3 className="text-2xl font-[600] leading-6 text-gray-900">
                    General Information
                  </h3>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="FirstName"
                      type={"text"}
                      label="First Name"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      required
                      value={StudentValues?.FirstName}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          FirstName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="LastName"
                      type={"text"}
                      label="Last Name"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      required
                      value={StudentValues?.LastName}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          LastName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-2 row-span-4">
                    <div className="flex items-center justify-between">
                      {/* <h3
                        className={`font-semibold ${
                          Errors.FileError
                            ? "text-red-500"
                            : "text-text_color_secondary_2"
                        }`}
                      >
                        Choose Profile Picture:
                      </h3> */}
                      {Errors.FileError && (
                        <p className="text-red-500 italic">
                          {" "}
                          Image Field is Required
                        </p>
                      )}
                    </div>

                    <div
                      className={`${
                        Preview ? "block" : "hidden"
                      } grid grid-cols-10 gap-5`}
                    >
                      <div className={`h-64 w-full col-span-10`}>
                        <img
                          id="file-ip-1-preview"
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div
                        className={`flex flex-col items-center justify-center gap-3 col-span-10`}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => Fileref.current.click()}
                          className="w-full h-fit text-[16px] bg-hover_color flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Change Picture
                        </Button>

                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => {
                            setPreview(false);
                            setFile(null);
                          }}
                          className="w-full h-fit text-[16px] bg-red-500 flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div
                        className={`${
                          Preview ? "hidden" : "block"
                        } flex items-center justify-center w-full`}
                      >
                        <label
                          for="dropzone-file"
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                            Errors.FileError
                              ? "border-red-500"
                              : "border-gray-300"
                          }  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className={`w-10 h-10 mb-3 text-gray-400 ${
                                Errors.FileError
                                  ? "text-red-500"
                                  : "text-gray-500 "
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p
                              className={`mb-2 text-sm ${
                                Errors.FileError
                                  ? "text-red-500"
                                  : "text-gray-500 "
                              }`}
                            >
                              <span className="font-semibold">
                                Choose Your Profile Picture
                              </span>
                              <br />
                              <span className="text-center text-sm">
                                Click To Upload
                              </span>
                            </p>
                            <p
                              className={`text-xs ${
                                Errors.FileError
                                  ? "text-red-500"
                                  : "text-gray-500 "
                              }`}
                            >
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            ref={Fileref}
                            type="file"
                            className="hidden"
                            onChange={ShowPreviewImage}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      {Errors.FileError && (
                        <p className="text-red-500 italic">
                          {" "}
                          Image Field is Required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="email"
                      type={"email"}
                      label="Email Address"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      required
                      value={StudentValues?.Email}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Email: e.target.value,
                        });
                      }}
                      disabled
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"text"}
                      label="Mobile Number"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      required
                      value={StudentValues?.PhoneNo}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          PhoneNo: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"number"}
                      label="Height (in feets)"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Height}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Height: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"text"}
                      label="Nationality"
                      className="w-full"
                      variant="outlined"
                      required
                      size="medium"
                      value={StudentValues?.Nationality}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Nationality: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"text"}
                      label="Religion"
                      required
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Religion}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Religion: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"number"}
                      required
                      label="Siblings"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Siblings}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Siblings: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"text"}
                      label="Gender"
                      required
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Gender}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Gender: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"number"}
                      label="Age"
                      required
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Age}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Age: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"text"}
                      label="Qualifications"
                      required
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Qualifications}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Qualifications: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6">
                    <TextField
                      id="lastName"
                      type={"text"}
                      required
                      label="Your Address"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Address}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Address: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col-span-6">
                    <TextField
                      id="lastName"
                      type={"text"}
                      required
                      label="Dscribe Yourself"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Description}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Description: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white px-4 py-3 text-right sm:px-6 rounded-lg">
              <Button
                variant="contained"
                className="w-full font-semibold"
                size="large"
                type="submit"
              >
                UPDATE PROFILE
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default GeneralTab;
