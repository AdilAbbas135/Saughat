import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const EventOrganizerDashboard = createSlice({
  name: "EventOrganizerDashboard",
  initialState: {
    loading: true,
    EventOrganizer: null,
    isProfileFetched: false,
    error: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.EventOrganizer = action.payload;
      state.isProfileFetched = true;
    });
    builder.addCase(FetchProfile.rejected, (state, action) => {
      console.log(action);
      state.error = true;
      state.errorMessage = action.error.message;
    });
  },
});

export const FetchProfile = createAsyncThunk("Fetch/FetchProfile", async () => {
  const token = localStorage.getItem("authtoken");
  const result = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/event-organizer`,
    {},
    { headers: { token: token } }
  );
  console.log(result);
  const data = await result.data.EventOrganizer;
  return data;
});
// export const { FetchProfile } = StudentDashboard.actions;
export default EventOrganizerDashboard.reducer;
