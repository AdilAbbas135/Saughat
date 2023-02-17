import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CompleteProfile = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [SamePasswordError, setSamePasswordError] = useState(false);
  const [UserALLData, setUserALLData] = useState(
    location?.state?.data ? JSON.parse(location?.state?.data) : ""
  );
  const DisplayName = UserALLData?.googleData?.displayName;
  const Fullname = DisplayName ? DisplayName.split(" ") : "";

  const [UserData, setUserData] = useState({
    Email: UserALLData?.User?.Email,
    FirstName: Fullname[0] ? Fullname[0] : "",
    LastName: Fullname.slice(-1) ? Fullname.slice(-1)[0] : "",
    phoneNumber: UserALLData?.googleData?.phoneNumber,
    photo: UserALLData?.googleData?.photo,
    provider: UserALLData?.googleData?.provider || UserALLData.User.AccountType,
    userId: UserALLData?.User?._id,
  });
  const [userType, setuserType] = useState("");

  const ChangeUserType = (event) => {
    setuserType(event.target.value);
    setUserData({ ...UserData, userRole: event.target.value });
  };

  useEffect(() => {}, []);
  const CreatePofileFunc = async (e) => {
    e.preventDefault();
    if (UserData.Password === UserData.c_Password) {
      if (userType === "student") {
        console.log("ok i am in student");
        console.log(UserData);
        await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/student/createprofile`,
            UserData
          )
          .then((result) => {
            console.log(result);
            toast.success("Login Successfull", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.setItem("authtoken", result.data.authtoken);
            navigate("/user/student");
          })
          .catch((err) => console.log(err));
      }
    } else {
      setSamePasswordError(true);
    }
  };

  return (
    <>
      {/* <Head>
        <title>Complete Your Profile - TeachersHub</title>
        <meta name="description" content="Find the Best Teachers Near You" />
      </Head> */}
      <ToastContainer />
      <div
        className={`LoginWrapper h-screen w-screen overflow-hidden flex items-center justify-center`}
      >
        <div className="flex min-h-full items-center justify-center py-12 px-2 sm:px-6 lg:px-8">
          <div className="w-[calc(100vw-20px)] md:w-[800px] bg-white py-8 md:px-5 rounded-md">
            <h1 className="text-2xl md:text-4xl font-bold text-center">
              Complete Your Profile
            </h1>
            {/* Intro section */}
            <form onSubmit={CreatePofileFunc}>
              <div className="px-5 md:px0 mt-7 grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-2 tablets:col-span-1">
                  <TextField
                    id="email"
                    type={"email"}
                    label="Email"
                    className="w-full "
                    variant="outlined"
                    size="medium"
                    disabled
                    value={UserData?.Email}
                    onChange={(e) =>
                      setUserData({ ...UserData, Email: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2 tablets:col-span-1">
                  <TextField
                    id="FirstName"
                    type={"text"}
                    label="First Name"
                    className="w-full"
                    variant="outlined"
                    size="medium"
                    value={UserData?.FirstName}
                    onChange={(e) =>
                      setUserData({ ...UserData, FirstName: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2 tablets:col-span-1">
                  <TextField
                    id="lastName"
                    type={"text"}
                    label="Last Name"
                    className="w-full"
                    variant="outlined"
                    size="medium"
                    value={UserData?.LastName}
                    onChange={(e) =>
                      setUserData({ ...UserData, LastName: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2 tablets:col-span-1">
                  {/* <InputLabel id="user-role-label">Age</InputLabel> */}
                  <Select
                    // labelId="user-role-label"
                    id="user-role"
                    value={userType}
                    label="Who Are You"
                    onChange={ChangeUserType}
                    size="medium"
                    className="w-full"
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      Who are You?
                    </MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>
                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                    <MenuItem value={"institute"}>Institute</MenuItem>
                  </Select>
                </div>
                {!UserALLData?.googleData && (
                  <>
                    <div className="col-span-2 tablets:col-span-1">
                      <TextField
                        id="password"
                        type={"password"}
                        label="Password"
                        className="w-full"
                        variant="outlined"
                        size="medium"
                        required
                        value={UserData?.Password}
                        onChange={(e) => {
                          setSamePasswordError(false);
                          setUserData({
                            ...UserData,
                            Password: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-span-2 tablets:col-span-1">
                      <TextField
                        id="confirm-password"
                        type={"password"}
                        label="Confirm Password"
                        className="w-full"
                        variant="outlined"
                        size="medium"
                        required
                        value={UserData?.c_Password}
                        onChange={(e) => {
                          setSamePasswordError(false);
                          setUserData({
                            ...UserData,
                            c_Password: e.target.value,
                          });
                        }}
                      />
                    </div>
                    {SamePasswordError && (
                      <div className="col-span-2">
                        <p className="italic text-red-500">
                          Password & Confirm Password must be Same
                        </p>
                      </div>
                    )}
                  </>
                )}

                <Button
                  variant="outlined"
                  size="large"
                  className="col-span-2 w-full mt-1 py-3 font-semibold"
                  type="submit"
                >
                  <span>Create Profile</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
