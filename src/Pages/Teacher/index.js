import React from "react";
import Dashboard from "../../Components/Teacher/Dashboard/Dashboard";
import DashboardUI from "../../Components/Teacher/DashboardUI";

const Teacher = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [Teacher, setTeacher] = useState({});
  // const [loading, setloading] = useState(true);
  // const [showSidebar, setshowSidebar] = useState(true);
  // const [selected, setselected] = useState("Dashboard");

  // useEffect(() => {
  //   setloading(true);
  //   const token = localStorage.getItem("authtoken");
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_BACKEND_URL}/teacher`,
  //       {},
  //       { headers: { token: token } }
  //     )
  //     .then((result) => {
  //       console.log("Teacher profile fetched successfully");
  //       console.log(result);
  //       setTeacher(result.data?.Teacher);
  //       setloading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       dispatch(clearSession());
  //       navigate("/auth/signin", {
  //         state: { studentPageError: true, error: err?.response?.data?.error },
  //       });
  //     });
  //   // eslint-disable-next-line
  // }, []);

  return (
    // <>
    //   <ToastContainer />
    //   <div className="min-h-screen overflow-hidden bg-[#F7F7F7]">
    //     {loading ? (
    //       <Loader />
    //     ) : (
    //       <div>
    //         <div className="fixed top-0 left-0 z-[500]">
    //           <Header
    //             Teacher={Teacher}
    //             setshowSidebar={setshowSidebar}
    //             showSidebar={showSidebar}
    //           />
    //         </div>
    //         <div className="w-full flex">
    //           <div
    //             className={` transition-all ${
    //               showSidebar ? "w-[20%] " : "w-0"
    //             } h-screen  overflow-hidden`}
    //           >
    //             <Sidebar
    //               showSidebar={showSidebar}
    //               selected={selected}
    //               setselected={setselected}
    //             />
    //           </div>
    //           <div className="mt-[65px] w-full relative pt-5 sm:px-6 md:px-10 lg:mx-auto lg:max-w-7xl">
    //             {selected === "Dashboard" && (
    //               <Dashboard Teacher={Teacher} SetTeacher={setTeacher} />
    //             )}
    //             {selected === "Profile" && <ProfileTab />}
    //             {selected === "Tution Services" && <TutionServices />}
    //             {selected === "MY Questions" && <QuestionsTab />}
    //             {selected === "Discussion" && <DiscussionTab />}
    //             {selected === "General" && (
    //               <GeneralTab Teacher={Teacher} SetTeacher={setTeacher} />
    //             )}
    //           </div>
    //         </div>
    //         {/* <Footer /> */}
    //       </div>
    //     )}
    //   </div>
    // </>
    <DashboardUI>
      <Dashboard />
    </DashboardUI>
  );
};

export default Teacher;
