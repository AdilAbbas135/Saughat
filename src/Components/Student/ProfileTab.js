import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileTab = ({ Student }) => {
  const [StudentValues, setStudentValues] = useState(Student);
  const handleSubmitAccount = async () => {
    const token = localStorage.getItem("authtoken");
    await toast.promise(
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/student/updatestudent`,
          StudentValues,
          { headers: { token: token } }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        }),
      {
        pending: "Updating! Please Wait",
        success: "Profile Updated Successfully",
        error: "Error in Udating Account",
      },
      {
        toastId: "123456789",
      }
    );
  };

  useEffect(() => {
    console.log("re-render");
  }, []);
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
          <div className=" mt-5">
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
                      id="MiddleName"
                      type={"text"}
                      label="Middle Name"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.MiddleName}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          MiddleName: e.target.value,
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
                      // disabled={
                      //   Student.AccountType === "google.com" ? true : false
                      // }
                      disabled
                    />
                  </div>
                  {/* <div className="col-span-6 sm:col-span-2">
                      <TextField
                        id="lastName"
                        type={"text"}
                        label="Cuurent Class"
                        className="w-full"
                        variant="outlined"
                        size="medium"
                      />
                    </div> */}
                  <div className="col-span-6 sm:col-span-2">
                    <TextField
                      id="lastName"
                      type={"text"}
                      label="Mobile Number"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.PhoneNo}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          PhoneNo: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mt-10 mb-5">
                  <h3 className="text-2xl font-[600] leading-6 text-gray-900">
                    Address
                  </h3>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <TextField
                      id="street-address"
                      type={"text"}
                      label="Street Address"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Address?.StreetAddress}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          StreetAddress: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <TextField
                      id="province"
                      type={"text"}
                      label="Province"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Address?.Province}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          Province: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <TextField
                      id="city"
                      type={"text"}
                      label="City"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Address?.City}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          City: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <TextField
                      id="zipcode"
                      type={"text"}
                      label="Zip Code"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      value={StudentValues?.Address?.ZipCode}
                      onChange={(e) => {
                        setStudentValues({
                          ...StudentValues,
                          ZipCode: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* <div className="mt-7 py-1 px-4 m-auto rounded-md w-max border-2 border-gray-300  ">
                      <FormControlLabel
                        className="select-none"
                        label=" I agree to the Terms & Conditions"
                        control={<Checkbox />}
                      />
                    </div> */}
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

export default ProfileTab;
