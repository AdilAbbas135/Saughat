import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { combineReducers } from "@reduxjs/toolkit";
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
    session: { user: user, authenticated: false },
  },
  reducers: {
    createSession: (state, action) => {
      const token = localStorage.getItem("authtoken");
      let user = jwtDecode(token);
      state.session.user = user;
      state.session.authenticated = true;
    },
    clearSession: (state, session) => {
      state.session = {};
      localStorage.removeItem("authtoken");
      state.session.authenticated = false;
    },
    getSession: (state, session) => {
      const token = localStorage.getItem("authtoken");
      if (token) {
        user = jwtDecode(token);
        if (user?.userId && user?.profileId) {
          state.session.authenticated = true;
          state.session.user = user;
        }
      }
    },
  },
});

export const { createSession, clearSession, getSession } = SessionSlice.actions;
export default SessionSlice.reducer;
