import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Login from "./Pages/auth/signin";
import SignUp from "./Pages/auth/signup";
import SendEmail from "./Pages/auth/signup/sendemail";
import Emailverification from "./Pages/auth/signup/emailverification";
import CompleteProfile from "./Pages/auth/signup/nextstep";
import HallManagerDashbaord from "./Pages/Dashboards/HallManager/index";
import HallsPage from "./Pages/Halls/Halls";
import SingleHall from "./Pages/Halls/SingleHall";
import Halls from "./Pages/Dashboards/HallManager/Halls";
import AddHallPage from "./Pages/Dashboards/HallManager/AddHall";
import Food from "./Pages/Dashboards/HallManager/Food";
import AddFoodPage from "./Pages/Dashboards/HallManager/AddFood";
import FoodsPage from "./Pages/Food/Food";
import SingleFood from "./Pages/Food/SingleFood";
import HallBookingPage from "./Pages/Halls/Book";
import Bookings from "./Pages/Dashboards/HallManager/Bookings";
import EntertainerBookings from "./Pages/Dashboards/Entertainer/Bookings";
import SingleBooking from "./Pages/Dashboards/HallManager/SingleBooking";
import EventOrganizerDashbaord from "./Pages/Dashboards/EventOrganizer";
import BookSingleFood from "./Pages/Food/Book";
import EventOrganizerBookings from "./Pages/Dashboards/EventOrganizer/Bookings";
import SingleEventOrganizerBooking from "./Pages/Dashboards/EventOrganizer/SingleBooking";
import EntertainerDashbaord from "./Pages/Dashboards/Entertainer";
import Services from "./Pages/Dashboards/Entertainer/Services";
import AddServicePage from "./Pages/Dashboards/Entertainer/AddService";
import PhotoGraphersPage from "./Pages/Photographers";
import SinglePhotographer from "./Pages/Photographers/SinglePhotographer";
import BookPhotographer from "./Pages/Photographers/Book";
import SingleEntertainerBooking from "./Pages/Dashboards/Entertainer/SingleBooking";
import PyroPage from "./Pages/Pyro";
import Bandspage from "./Pages/BandsMan";
import ProfilePage from "./Pages/Dashboards/EventOrganizer/Profile";
import Profiles from "./Pages/Dashboards/EventOrganizer/Spouse/Profiles";
import SingleProfile from "./Pages/Dashboards/EventOrganizer/Spouse/SingleProfile";
import CardGenerator from "./Pages/CardDesign/CardGenerator";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/auth/signin", element: <Login /> },
    { path: "/auth/signup", element: <SignUp /> },

    // SIGNUP,SIGNIN AND VERIFICATION ROUTES
    { path: "/auth/signup/sendemail", element: <SendEmail /> },
    { path: "/auth/signup/emailverification", element: <Emailverification /> },
    { path: "/auth/signup/nextstep", element: <CompleteProfile /> },

    // Hall Manager ROUTES
    { path: "/user/hall-manager", element: <HallManagerDashbaord /> },
    { path: "/user/hall-manager/halls", element: <Halls /> },
    { path: "/hall-manager/halls/add-hall", element: <AddHallPage /> },
    { path: "/user/hall-manager/food", element: <Food /> },
    { path: "/hall-manager/food/add-food", element: <AddFoodPage /> },
    { path: "/user/hall-manager/bookings", element: <Bookings /> },
    { path: "/user/hall-manager/bookings/:id", element: <SingleBooking /> },

    // Event Organizer ROUTES
    { path: "/user/event-organizer", element: <EventOrganizerDashbaord /> },
    {
      path: "/user/event-organizer/bookings",
      element: <EventOrganizerBookings />,
    },
    {
      path: "/user/event-organizer/bookings/:id",
      element: <SingleEventOrganizerBooking />,
    },
    {
      path: "/user/event-organizer/profile",
      element: <ProfilePage />,
    },
    {
      path: "/user/event-organizer/find-spouse",
      element: <Profiles />,
    },
    {
      path: "/user/event-organizer/find-spouse/:id",
      element: <SingleProfile />,
    },

    // Entertainer ROUTES
    { path: "/user/entertainer", element: <EntertainerDashbaord /> },
    { path: "/user/entertainer/services", element: <Services /> },
    {
      path: "/user/entertainer/services/add-service",
      element: <AddServicePage />,
    },
    { path: "/user/entertainer/bookings", element: <EntertainerBookings /> },
    {
      path: "/user/entertainer/bookings/:id",
      element: <SingleEntertainerBooking />,
    },

    { path: "/halls", element: <HallsPage /> },
    { path: "/halls/:id", element: <SingleHall /> },
    { path: "/halls/:id/book", element: <HallBookingPage /> },
    { path: "/food", element: <FoodsPage /> },
    { path: "/food/:id", element: <SingleFood /> },
    { path: "/food/:id/book", element: <BookSingleFood /> },
    { path: "/photographers", element: <PhotoGraphersPage /> },
    { path: "/photographers/:id", element: <SinglePhotographer /> },
    { path: "/photographers/:id/book", element: <BookPhotographer /> },
    { path: "/pyro", element: <PyroPage /> },
    { path: "/bands", element: <Bandspage /> },
    { path: "/card-generator", element: <CardGenerator /> },

    { path: "*", element: <Error /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
