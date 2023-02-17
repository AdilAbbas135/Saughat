import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const AlertSlice = createSlice({
  name: "alert",
  initialState: {
    type: "",
    message: "",
    options: {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    },
  },
  reducers: {
    createAlert: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      action.payload?.options?.position &&
        (state.options = {
          ...state.options,
          position: action.payload?.options?.position,
        });

      if (state.type === "error") {
        toast.error(`${state.message}`, state.options);
      } else {
        toast.success(`${state.message}`, state.options);
      }
    },
  },
});

export const { createAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
