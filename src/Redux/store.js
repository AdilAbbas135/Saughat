import { configureStore } from "@reduxjs/toolkit";
import SessionRedux from "./SessionRedux";
import Alert from "./Alert";
import StudentDashboard from "./StudentDashboard";
import HallManagerDashboard from "./HallManagerDashboard";
import InstituteDashboard from "./InstituteDashboard";

export default configureStore({
  reducer: {
    session: SessionRedux,
    Alert,
    StudentDashboard,
    HallManagerDashboard,
    InstituteDashboard,
  },
});
