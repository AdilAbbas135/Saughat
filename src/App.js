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
import SingleBooking from "./Pages/Dashboards/HallManager/SingleBooking";
import EventOrganizerDashbaord from "./Pages/Dashboards/EventOrganizer";
import BookSingleFood from "./Pages/Food/Book";
import EventOrganizerBookings from "./Pages/Dashboards/EventOrganizer/Bookings";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/auth/signin", element: <Login /> },
    { path: "/auth/signup", element: <SignUp /> },

    // SIGNUP,SIGNIN AND VERIFICATION ROUTES
    { path: "/auth/signup/sendemail", element: <SendEmail /> },
    { path: "/auth/signup/emailverification", element: <Emailverification /> },
    { path: "/auth/signup/nextstep", element: <CompleteProfile /> },

    // STUDENT ROUTES
    // { path: "/user/student", element: <Student /> },
    // { path: "/user/student/profile", element: <Profile /> },
    // { path: "/user/student/questions", element: <StudentQAHUB /> },
    // { path: "/user/student/questions/:id", element: <ViewQuestion /> },
    // { path: "/user/student/discussion", element: <StudentDiscussionPage /> },
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
    // { path: "/user/teacher/profile", element: <TeacherProfilePage /> },
    // {
    //   path: "/user/teacher/settings/general",
    //   element: <TeacherGeneralSettings />,
    // },

    // Institute ROUTES
    // { path: "/user/institute", element: <InstituteDashboard /> },

    // NORMAL PAGES ROUTES
    // { path: "/teachers", element: <TeachersPage /> },
    // { path: "/teachers/:id", element: <SingleTeacher /> },
    // { path: "/SearchTeacher", element: <SearchTeacher /> },

    { path: "/halls", element: <HallsPage /> },
    { path: "/halls/:id", element: <SingleHall /> },
    { path: "/halls/:id/book", element: <HallBookingPage /> },
    { path: "/food", element: <FoodsPage /> },
    { path: "/food/:id", element: <SingleFood /> },
    { path: "/food/:id/book", element: <BookSingleFood /> },
    // { path: "/qahub", element: <QAHUB /> },
    // { path: "/qahub/:qid", element: <Singlequestion /> },
    // { path: "/qahub/create-room/roomDetails", element: <QaHubRoom /> },
    // { path: "/discussion", element: <Discussion /> },
    // { path: "/discussion/:id", element: <SingleDiscussion /> },
    // { path: "/jobs", element: <Jobs /> },
    // { path: "/jobs/:id", element: <SingleJob /> },
    // { path: "/institutes", element: <Institute /> },
    // { path: "/institutes/:id", element: <SingleInstitute /> },
    { path: "*", element: <Error /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
