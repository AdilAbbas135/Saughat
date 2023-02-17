import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const session = useSelector((state) => state.session.session);
  const [authenticated, setauthenticated] = useState(undefined);
  useEffect(() => {
    if (session.user.userId && session.user.profileId) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Navbar z-[2] h-fit flex justify-center">
      <div className="navbar-container mt-2 flex justify-between items-center h-full w-full max-w-6xl px-5 lg:px-0 text-white">
        <div>
          <Link to={"/"}>
            {/* <div className="logo font-bold text-lg tablets:text-3xl">
              TEACHERS HUB.
            </div> */}
            <img height={250} width={250} src={"/TH-white.png"} alt="" />
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="font-semibold flex space-x-4 text-lg">
            <li className="cursor-pointer">
              <Link to={"/teachers"}>Teachers</Link>
            </li>
            <li className="cursor-pointer">Q&A HUB</li>
            <li className="cursor-pointer">Jobs</li>
            <li className="cursor-pointer">Discussion</li>
          </ul>
        </div>

        {authenticated ? (
          <div className="space-x-2 flex items-center">
            {/* PROFILE BUTTON FOR AUTHORIZED USERS */}
            <Link to={"/user/student"}>
              <img
                height={50}
                width={50}
                alt=""
                src={
                  session?.user?.ProfilePicture
                    ? session?.user?.ProfilePicture
                    : "/assets/user.png"
                }
                className="h-14 w-14 rounded-full"
              />
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("authtoken");
                window.location.reload();
              }}
              className="h-fit py-1 px-2 tablets:py-2 tablets:px-3 bg-white text-main_bg_color font-semibold rounded-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* LOGIN BUTTON FOR UNAUTHORIZED USERS */}
            <div className="space-x-4">
              <Link to={"/auth/signin"}>
                <button className="py-2 px-2 tablets:py-2 tablets:px-3 bg-white text-main_bg_color font-semibold rounded-sm">
                  Login/Register
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
