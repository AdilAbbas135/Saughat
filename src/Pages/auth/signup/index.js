import { useState } from "react";
import { SiGmail } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

  const CreateAccount = async () => {
    setloading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/account/createaccount?email=${email}`
      )
      .then((result) => {
        console.log(result);
        if (result.data?.success) {
          navigate("/auth/signup/sendemail");
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error(
          error?.response?.data?.msg
            ? error.response.data.msg
            : "Something went wrong! Try Again",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });
  };
  return (
    <>
      {/* <Head>
        <title>Create Your Account- TeachersHub</title>
        <meta name="description" content="Find the Best Teachers Near You" />
      </Head> */}
      <ToastContainer />
      <div
        className={`LoginWrapper h-screen w-screen overflow-hidden flex items-center justify-center`}
      >
        <div className="flex min-h-full items-center justify-center mt-5 px-2">
          <div className="w-full max-w-sm md:max-w-md space-y-4 md:space-y-6 bg-white py-8 px-5 md:px-12 rounded-sm">
            <div>
              <Link to={"/"} className="cursor-pointer">
                {/* <img
                  className="mx-auto h-12 w-auto"
                  src="/assets/chainraise_logo_black_text.png"
                  alt="Chainraise Logo"
                /> */}
                <h1 className="text-center logo font-bold text-3xl">
                  Teachers Hub
                </h1>
              </Link>
              <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
                Create Your Account
              </h2>
            </div>
            <div className=" grid grid-cols-3 gap-x-2">
              <div className="    ">
                <button
                  className="flex border border-gray-300 px-10  py-2 text-center text-gray-900"
                  // onClick={() =>
                  //   signIn("facebook", {
                  //     callbackUrl: "/profile",
                  //   })
                  // }
                >
                  <FaFacebookSquare size={25} />
                </button>
              </div>
              <div className="  ">
                <button className="flex border border-gray-300 px-10  py-2 text-center">
                  <SiGmail size={25} />
                </button>
              </div>
              <div className="">
                <button className="flex border border-gray-300 px-10  py-2 text-center ">
                  <GrLinkedin size={25} />
                </button>
              </div>
            </div>
            <div className="relative flex items-center py-4">
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
                CreateAccount();
              }}
            >
              <TextField
                id="email"
                type={"email"}
                label="Email Address"
                className="w-full"
                variant="outlined"
                size="medium"
                value={email}
                required
                onChange={(e) => setemail(e.target.value)}
              />
              <div>
                <Button
                  variant="contained"
                  className="w-full font-semibold"
                  size="large"
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress
                      size={25}
                      sx={{ color: "white" }}
                      className="text-white"
                    />
                  ) : (
                    <span>Create Account</span>
                  )}
                </Button>
                {/* </Link> */}
                <div className="flex justify-center">
                  <Link to={"/auth/signin"}>
                    <button className="mt-1 h-10 rounded-md bg-transparent text-sm font-medium text-main_bg_color hover:text-hover_color focus:outline-none">
                      Already Have an Account? Login Now
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
