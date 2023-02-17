import React, { useEffect, useState } from "react";
import ProfileTab from "../../Components/Student/ProfileTab";
import QuestionsTab from "../../Components/Student/QuestionsTab";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import DiscussionTab from "../../Components/Student/DiscussionTab";
import Header from "../../Components/Student/Header";
import Sidebar from "../../Components/Student/Sidebar";
import Loader from "../../Components/Loader";
import Dashboard from "../../Components/Student/Dashboard";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  // const session = useSelector((state) => state.session.session);
  const [Student, setStudent] = useState({});
  const [loading, setloading] = useState(true);
  const [showSidebar, setshowSidebar] = useState(true);
  const [selected, setselected] = useState("Dashboard");
  // FUNCTIONS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setloading(true);
    const token = localStorage.getItem("authtoken");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/student`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log("student profile fetched successfully");
        console.log(result);
        setStudent(result.data.student);
        setloading(false);
      })
      .catch((err) => {
        navigate("/auth/signin", {
          state: { studentPageError: true },
        });
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <Head>
        <title>Student Dashboard - TeachersHub</title>
      </Head> */}
      <ToastContainer />
      <div className="min-h-screen overflow-hidden bg-[#F7F7F7]">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="fixed top-0 left-0 z-[500]">
              <Header
                Student={Student}
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
                  selected={selected}
                  setselected={setselected}
                />
              </div>
              <div className="mt-[65px] w-full relative pt-5 sm:px-6 md:px-10 lg:mx-auto lg:max-w-7xl">
                {selected === "Dashboard" && (
                  <Dashboard Student={Student} SetStudent={setStudent} />
                )}
                {selected === "Profile" && (
                  <ProfileTab Student={Student} SetStudent={setStudent} />
                )}
                {selected === "MY Questions" && <QuestionsTab />}
                {selected === "Discussion" && <DiscussionTab />}
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        )}
      </div>
    </>
  );

  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
  }
};

export default Student;
