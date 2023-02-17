import { configureStore } from "@reduxjs/toolkit";
import SessionRedux from "./SessionRedux";
import Alert from "./Alert";

export default configureStore({
  reducer: {
    session: SessionRedux,
    Alert,
  },
});
