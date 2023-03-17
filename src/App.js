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

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/auth/signin", element: <Login /> },
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/user/student", element: <Student /> },
    { path: "/user/teacher", element: <Teacher /> },
    { path: "/auth/signup/sendemail", element: <SendEmail /> },
    { path: "/auth/signup/emailverification", element: <Emailverification /> },
    { path: "/auth/signup/nextstep", element: <CompleteProfile /> },
    { path: "/teachers", element: <TeachersPage /> },
    { path: "/teachers/:id", element: <SingleTeacher /> },
    { path: "/SearchTeacher", element: <SearchTeacher /> },
    { path: "/qahub", element: <QAHUB /> },
    { path: "/qahub/:qid", element: <Singlequestion /> },
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
