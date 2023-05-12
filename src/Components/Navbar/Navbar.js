import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSession } from "../../Redux/SessionRedux";
// import { useState } from "react";
// import { Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const session = useSelector((state) => state.session.session);
  const dispatch = useDispatch();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const openProfileMenu = Boolean(anchorEl);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  useEffect(() => {
    dispatch(getSession());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Navbar z-[2] h-fit flex justify-center">
      <div className="navbar-container my-2 flex justify-between items-center h-full w-full max-w-6xl px-5 lg:px-0 text-white">
        <div>
          <Link to={"/"}>
            <div className="logo font-bold text-lg tablets:text-3xl text-search_color">
              Saughaat
            </div>
            {/* <img height={200} width={200} src={"/TH-white.png"} alt="" /> */}
          </Link>
        </div>
        <div className="hidden md:block menu">
          <ul className="font-semibold flex space-x-2 text-[15px]">
            <li className="cursor-pointer">
              <Link to={"/halls"}>Halls</Link>
            </li>
            <li className="cursor-pointer">
              <Link to={"/food"}>Foods</Link>
            </li>
            <li className="cursor-pointer">
              <Link to={"/qahub"}>Q&A HUB</Link>
            </li>
            <li className="cursor-pointer">
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            <li className="cursor-pointer">
              <Link to={"/institutes"}>Institutes</Link>
            </li>
            <li className="cursor-pointer">
              <Link to={"/discussion"}>Discussion</Link>
            </li>
          </ul>
        </div>

        {session?.authenticated ? (
          <div className="space-x-2 flex items-center">
            {/* PROFILE BUTTON FOR AUTHORIZED USERS */}
            <Link to={`/user/${session?.user?.role}`}>
              <img
                height={50}
                width={50}
                alt=""
                src={
                  session?.user?.ProfilePicture
                    ? session?.user?.ProfilePicture
                    : "/assets/user.png"
                }
                className="h-[40px] w-[40px] rounded-full"
              />
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("authtoken");
                window.location.reload();
              }}
              className="h-fit text-sm px-2 tablets:py-2 tablets:px-3 bg-white text-main_bg_color font-semibold rounded-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* LOGIN BUTTON FOR UNAUTHORIZED USERS */}
            <div className="space-x-4">
              <Link to={"/auth/signin"}>
                <button
                  // onClick={(event) => setAnchorEl(event.currentTarget)}
                  className="py-2 px-2 tablets:py-2 tablets:px-3 bg-white text-main_bg_color font-semibold rounded-sm"
                >
                  Login/Register
                </button>
              </Link>
              {/* <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openProfileMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    background: "#fffff",
                    color: "black",
                    minWidth: 200,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 66,
                      width: 10,
                      height: 10,
                      background: "#eef1ff",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              >
                <MenuItem>
                  <Link href={"/profile"}>
                    <div className="flex items-center space-x-2s">
                      <span>Profile</span>
                    </div>
                  </Link>
                </MenuItem>
              </Menu> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
