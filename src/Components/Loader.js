import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex space-x-2 items-center justify-center bg-hover_color">
      <CircularProgress size={50} sx={{ color: "white" }} />{" "}
      <h1 className="text-3xl text-white">Loading..</h1>
    </div>
  );
};

export default Loader;
