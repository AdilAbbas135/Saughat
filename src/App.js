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

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/auth/signin", element: <Login /> },
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/user/student", element: <Student /> },
    { path: "/auth/signup/sendemail", element: <SendEmail /> },
    { path: "/auth/signup/emailverification", element: <Emailverification /> },
    { path: "/auth/signup/nextstep", element: <CompleteProfile /> },
    { path: "/teachers", element: <TeachersPage /> },
    { path: "/SearchTeacher", element: <SearchTeacher /> },
    { path: "*", element: <Error /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
