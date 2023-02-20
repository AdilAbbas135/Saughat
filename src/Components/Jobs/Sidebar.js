import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { GiRecycle } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div>
      <form>
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="font-semibold text-text_color_secondary text-2xl uppercase">
            Filter
          </h1>
          <p className="flex items-center cursor-pointer ">
            <GiRecycle className="mr-1 text-hover_color" /> Clear All
          </p>
        </div>
        <div className="mt-5 border-b pb-3">
          <h1 className="mb-2 font-semibold text-text_color_secondary_2 opacity-80 text-lg uppercase">
            Job Type
          </h1>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ "& .MuiButtonBase-root": { padding: "6px" } }}
            >
              <FormControlLabel
                value="fulltime"
                control={<Checkbox />}
                label="Full Time"
              />
              <FormControlLabel
                value="internship"
                control={<Checkbox />}
                label="Internship"
              />
              <FormControlLabel
                value="partime"
                control={<Checkbox />}
                label="Part time"
              />
              <FormControlLabel
                value="remote"
                control={<Checkbox />}
                label="Remote"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="mt-5">
          <h1 className="mb-2 font-semibold text-text_color_secondary_2 opacity-80 text-lg uppercase">
            Job Experience
          </h1>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ "& .MuiButtonBase-root": { padding: "6px" } }}
            >
              <FormControlLabel
                value="1-2years"
                control={<Checkbox />}
                label="1-2 Years"
              />
              <FormControlLabel
                value="3-5years"
                control={<Checkbox />}
                label="3-5 Years"
              />
              <FormControlLabel
                value="6-9years"
                control={<Checkbox />}
                label="6-9 Years"
              />
              <FormControlLabel
                value="10+years"
                control={<Checkbox />}
                label="10+ Years"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
