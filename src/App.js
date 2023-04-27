import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Login from "./Pages/auth/signin";
import SignUp from "./Pages/auth/signup";
import Student from "./Pages/student";
import SendEmail from "./Pages/auth/signup/sendemail";
import Emailverification from "./Pages/auth/signup/emailverification";
import CompleteProfile from "./Pages/auth/signup/nextstep";
import TeachersPage from "./Pages/teachers";
import SearchTeacher from "./Pages/SearchTeacher";
import SingleTeacher from "./Pages/teachers/singleteacher";
import QAHUB from "./Pages/qahub";
import Singlequestion from "./Pages/qahub/singlequestion";
import Discussion from "./Pages/discussion";
import SingleDiscussion from "./Pages/discussion/singlediscussion";
import Jobs from "./Pages/Jobs";
import SingleJob from "./Pages/Jobs/singleJob";
import Institute from "./Pages/institute";
import SingleInstitute from "./Pages/institute/singleInstitute";
import Teacher from "./Pages/Teacher";
import Profile from "./Pages/student/Profile";
import StudentQAHUB from "./Pages/student/QAHUB";
import TeacherProfilePage from "./Pages/Teacher/Profile";
import TeacherTutionPage from "./Pages/Teacher/Tution";
import ViewQuestion from "./Pages/student/QAHUB/ViewQuestion";
import QaHubRoom from "./Pages/qahub/QaHubRoom";
import StudentDiscussionPage from "./Pages/student/Discussion";
import TeacherGeneralSettings from "./Pages/Teacher/Settings/General";
import AddTutionPage from "./Pages/Teacher/AddTution";
import TutionsPage from "./Pages/teachers/Tutions";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/auth/signin", element: <Login /> },
    { path: "/auth/signup", element: <SignUp /> },
    // STUDENT ROUTES
    { path: "/user/student", element: <Student /> },
    { path: "/user/student/profile", element: <Profile /> },
    { path: "/user/student/questions", element: <StudentQAHUB /> },
    { path: "/user/student/questions/:id", element: <ViewQuestion /> },
    { path: "/user/student/discussion", element: <StudentDiscussionPage /> },
    // TEACHER ROUTES
    { path: "/user/teacher", element: <Teacher /> },
    { path: "/user/teacher/profile", element: <TeacherProfilePage /> },
    { path: "/user/teacher/tution-services", element: <TeacherTutionPage /> },
    { path: "/teacher/tution-services/add-tution", element: <AddTutionPage /> },
    {
      path: "/user/teacher/settings/general",
      element: <TeacherGeneralSettings />,
    },

    // SIGNUP,SIGNIN AND VERIFICATION ROUTES
    { path: "/auth/signup/sendemail", element: <SendEmail /> },
    { path: "/auth/signup/emailverification", element: <Emailverification /> },
    { path: "/auth/signup/nextstep", element: <CompleteProfile /> },
    // NORMAL PAGES ROUTES
    { path: "/teachers", element: <TeachersPage /> },
    { path: "/teachers/:id", element: <SingleTeacher /> },
    { path: "/SearchTeacher", element: <SearchTeacher /> },
    { path: "/tutions", element: <TutionsPage /> },
    { path: "/qahub", element: <QAHUB /> },
    { path: "/qahub/:qid", element: <Singlequestion /> },
    { path: "/qahub/create-room/roomDetails", element: <QaHubRoom /> },
    { path: "/discussion", element: <Discussion /> },
    { path: "/discussion/:id", element: <SingleDiscussion /> },
    { path: "/jobs", element: <Jobs /> },
    { path: "/jobs/:id", element: <SingleJob /> },
    { path: "/institutes", element: <Institute /> },
    { path: "/institutes/:id", element: <SingleInstitute /> },
    { path: "*", element: <Error /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
