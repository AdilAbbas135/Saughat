import { configureStore } from "@reduxjs/toolkit";
import SessionRedux from "./SessionRedux";
import Alert from "./Alert";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

export default configureStore({
  reducer: {
    session: SessionRedux,
    Alert,
    StudentDashboard,
    TeacherDashboard,
  },
});
