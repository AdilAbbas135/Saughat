import { SiGmail } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";
import { Button, CircularProgress, TextField } from "@mui/material";
import { SignInWithGoogle } from "../../../firebase";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { createAlert } from "../../../Redux/Alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createSession } from "../../../Redux/SessionRedux";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // let session = useSelector((state) => state.session);
  const [formData, setformData] = useState({});
  const [loading, setloading] = useState(false);

  const SignInGoogle = () => {
    SignInWithGoogle(process.env.REACT_APP_BACKEND_URL, function (response) {
      if (response.success) {
        console.log("the response from the backend in index file is ");
        console.log(response);
        if (response.User.profileId === null) {
          // CompleteProfile(response);
          console.log("ok go to next step");
          navigate("/auth/signup/nextstep", {
            state: { data: JSON.stringify(response) },
          });
        } else {
          localStorage.setItem("authtoken", response?.authtoken);
          navigate("/user/student");
        }
      } else {
        dispatch(
          createAlert({
            type: "error",
            message: "Something went wrong! Try Again",
          })
        );
      }
    });
  };

  const TryLogin = async () => {
    setloading(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/account/login`, formData)
      .then((response) => {
        // console.log(response);
        dispatch(
          createAlert({
            type: "success",
            message: "Login Successfull",
            options: {
              position: "top-right",
            },
          })
        );
        localStorage.setItem("authtoken", response.data.authtoken);
        dispatch(createSession());
        navigate(`/user/${response.data?.role}`);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        dispatch(
          createAlert({
            type: "error",
            message: err?.response?.data?.msg
              ? err?.response?.data?.msg
              : "Wrong Credentials! Try Again",
          })
        );
      });
  };

  useEffect(() => {
    if (location?.state?.error) {
      dispatch(
        createAlert({
          type: "error",
          message: location?.state?.error
            ? location?.state?.error
            : "Something Went Wrong! Try Again",
        })
      );
    }
    // if (location?.state?.studentPageError) {
    //   dispatch(
    //     createAlert({
    //       type: "error",
    //       message: "Error in Getting User Details! Please SignIn Again!",
    //     })
    //   );
    // }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* <Head>
        <title>Login into Your Account - TeachersHub</title>
        <meta name="description" content="Find the Best Teachers Near You" />
      </Head> */}
      <ToastContainer />
      <div className="overflow-hidden">
        <div
          className={`LoginWrapper md:h-screen w-screen flex items-center justify-center`}
        >
          <div className="flex min-h-full items-center justify-center mt-5 px-2">
            <div className="w-full md:max-w-md space-y-3 md:space-y-3 bg-white py-5 pt-10 px-5 md:px-12 rounded-sm md:rounded-md">
              <div className="flex flex-col justify-center items-center">
                <Link to={"/"} className="cursor-pointer">
                  <img
                    height={300}
                    width={250}
                    src={"/TH-black.png"}
                    className="h-full w-full"
                    alt=""
                  />
                </Link>
                <h2 className="mt-5 capitalize text-xl font-bold text-gray-900">
                  Sign in to your account
                </h2>
                <span className="block h-[3px] w-24 mx-auto bg-hover_color my-2"></span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="">
                  <button className="flex border border-gray-300 px-10 py-2 text-center text-gray-900">
                    <FaFacebookSquare size={25} />
                  </button>
                </div>
                <div className="  ">
                  <button
                    className="flex border border-gray-300 px-10 py-2 text-center"
                    onClick={SignInGoogle}
                  >
                    <SiGmail size={25} />
                  </button>
                </div>
                <div className="">
                  <button
                    className="flex border border-gray-300 px-10 py-2 text-center "
                    // onClick={linkedInLogin}
                  >
                    <GrLinkedin size={25} />
                  </button>
                </div>
              </div>
              <div className="relative flex items-center py-2 md:py-4">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 flex-shrink text-gray-400">
                  Or Continue with
                </span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <form
                className="mt-8 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  TryLogin();
                }}
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md">
                  <div>
                    <TextField
                      id="email"
                      type={"email"}
                      label="Email Address"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      required
                      value={formData?.email}
                      onChange={(e) =>
                        setformData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="pt-5 space-y-6">
                    <TextField
                      id="password"
                      type={"password"}
                      label="Password"
                      className="w-full"
                      variant="outlined"
                      size="medium"
                      required
                      value={formData?.password}
                      onChange={(e) =>
                        setformData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-main_bg_color focus:bg-hover_color"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="mt-2 md:mt-0 text-sm">
                    <a
                      href="/qwertyui"
                      className="font-medium text-main_bg_color hover:text-hover_color"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-full font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                    size="large"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <div className="text-white">
                        <CircularProgress
                          size={15}
                          sx={{ color: "white" }}
                          className="text-white"
                        />
                      </div>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </Button>
                  <div className="flex justify-center">
                    <Link to={"/auth/signup"}>
                      <button className="mt-1 h-10 rounded-md bg-transparent text-sm font-medium text-main_bg_color hover:text-hover_color focus:outline-none">
                        Dont Have an Account? Register Now
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
