import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HallManagerDashboard = createSlice({
  name: "HallManagerDashboard",
  initialState: {
    loading: true,
    HallManager: null,
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
      state.HallManager = action.payload;
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
    `${process.env.REACT_APP_BACKEND_URL}/hall-manager`,
    {},
    { headers: { token: token } }
  );
  console.log(result);
  const data = await result.data.HallManager;
  return data;
});
// export const { FetchProfile } = StudentDashboard.actions;
export default HallManagerDashboard.reducer;
