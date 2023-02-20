import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
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
            Rating
          </h1>
          <Rating
            name="read-only"
            value={5}
            readOnly
            className="block w-full"
          />
          <Rating
            name="read-only"
            value={4}
            readOnly
            className="block w-full"
          />
          <Rating
            name="read-only"
            value={3}
            readOnly
            className="block w-full"
          />
          <Rating
            name="read-only"
            value={2}
            readOnly
            className="block w-full"
          />
          <Rating
            name="read-only"
            value={1}
            readOnly
            className="block w-full"
          />
        </div>
        <div className="mt-5">
          <h1 className="mb-2 font-semibold text-text_color_secondary_2 opacity-80 text-lg uppercase">
            Size
          </h1>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ "& .MuiButtonBase-root": { padding: "6px" } }}
            >
              <FormControlLabel
                value="5-10"
                control={<Checkbox />}
                label="5-10"
              />
              <FormControlLabel
                value="30-50"
                control={<Checkbox />}
                label="30-50"
              />
              <FormControlLabel
                value="50-100"
                control={<Checkbox />}
                label="50-100"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
