import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { clearSession } from "../../Redux/SessionRedux";
import { FetchProfile } from "../../Redux/EventOrganizerDashboard";
import Loader from "../Loader";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardUI = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashboard = useSelector((state) => state.EventOrganizerDashboard);
  const error = useSelector((state) => state.EventOrganizerDashboard.error);
  const [showSidebar, setshowSidebar] = useState(true);

  useEffect(() => {
    if (!dashboard.isProfileFetched && !dashboard?.EventOrganizer?._id) {
      dispatch(FetchProfile());
    }
    //eslint-disable-next-line
  }, [dispatch]);
  if (error) {
    dispatch(clearSession());
    navigate("/auth/signin", {
      state: { studentPageError: true, error: dashboard?.errorMessage },
    });
  }
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen overflow-hidden bg-[#F7F7F7]">
        {dashboard.loading ? (
          <Loader />
        ) : (
          <div>
            <div className="fixed top-0 left-0 z-[500]">
              <Header
                HallManager={dashboard?.EventOrganizer}
                setshowSidebar={setshowSidebar}
                showSidebar={showSidebar}
              />
            </div>
            <div className="w-full flex">
              <div
                className={` transition-all ${
                  showSidebar ? "w-[20%] " : "w-0"
                } h-screen  overflow-hidden`}
              >
                <Sidebar
                  showSidebar={showSidebar}
                  // selected={selected}
                  // setselected={setselected}
                />
              </div>
              <div className="mt-[65px] w-full relative pt-5 sm:px-6 md:px-10 lg:mx-auto lg:max-w-7xl">
                {props.children}
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardUI;
