import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
var token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("authtoken");
}
let user = {};
try {
  if (token) {
    user = jwtDecode(token);
  }
} catch (error) {}
const SessionSlice = createSlice({
  name: "session",
  initialState: {
    session: { user: user },
  },
  reducers: {
    createSession: (state, action) => {
      state.session.user.userId = action.payload?.userId;
      state.session.user.profileId = action.payload?.profileId;
      state.session.user.ProfilePicture = action.payload?.ProfilePicture;
      state.session.user.email = action.payload?.email;
    },
  },
});

export const { createSession } = SessionSlice.actions;
export default SessionSlice.reducer;
