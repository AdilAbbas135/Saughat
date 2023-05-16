import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bookings from "../../../Pages/Dashboards/EventOrganizer/Bookings";

const links = [
  {
    name: "My Profile",
    image: "/assets/icons8-customer-96.png",
    count: "Check",
  },
];
const data = [
  {
    name: "Bookings",
    image: "/assets/student-icon-01.svg",
    count: "5",
  },
];
const Dashboard = () => {
  const Teacher = useSelector(
    (state) => state.EventOrganizerDashboard.EventOrganizer
  );
  return (
    <div className="mt-5 pb-10 sm:mx-6 lg:mx-auto lg:max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900 border-l-4 border-hover_color pl-2 capitalize">
          Welcome{" "}
          {Teacher?.FirstName?.toLowerCase() +
            " " +
            Teacher?.LastName?.toLowerCase()}
        </h1>
        <h3 className="text-lg font-semibold leading-6 text-text_color_secondary_2">
          <Link to={"/"}>Home</Link> / Event Organizer
        </h3>
      </div>
      {/* <div className="sm:mt-0 rounded-lg bg-white px-4 shadow-sm border border-gray-200"> */}
      <div className="my-10 grid grid-cols-3 gap-x-3 gap-y-3">
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border-2 border-gray-200 bg-white p-[25px]  shadow-sm "
            >
              <div>
                <h3 className="text-text_color_secondary_2 font-bold text-[20px]">
                  {link.name}
                </h3>
                <h2 className="text-hover_color font-semibold text-[16px] capitalize">
                  {link.count}
                </h2>
              </div>
              <div className="bg-[#edf4ff] px-2 py-2 rounded-md h-fit">
                <img src={link.image} height={40} width={40} alt="" />
              </div>
            </div>
          );
        })}

        {data.map((elem, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border-2 border-gray-200 bg-white p-[25px] shadow-sm "
            >
              <div>
                <h3 className="text-text_color_secondary_2 font-semibold text-[15px]">
                  {elem?.name}
                </h3>
                <h2 className="text-text_color font-bold text-3xl">
                  {elem?.count}
                </h2>
              </div>
              <div className="bg-[#edf4ff] px-2 py-2 rounded-md h-fit">
                <img src={elem.image} height={40} width={40} alt="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-5">
        <Bookings />
      </div>
    </div>
  );
};

export default Dashboard;
