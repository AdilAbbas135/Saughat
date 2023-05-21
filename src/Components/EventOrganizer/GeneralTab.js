import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createAlert } from "../../Redux/Alert";

const GeneralTab = () => {
  const dispatch = useDispatch();
  const [StudentValues, setStudentValues] = useState(
    useSelector((state) => state?.EventOrganizerDashboard?.EventOrganizer)
  );
  const handleSubmitAccount = async () => {
    const token = localStorage.getItem("authtoken");

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/event-organizer/updateprofile`,
        StudentValues,
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
