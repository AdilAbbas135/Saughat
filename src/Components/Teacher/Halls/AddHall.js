import { Button } from "@material-tailwind/react";
import { CircularProgress, TextField, TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { RxReader } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../Redux/Alert";
import { useNavigate } from "react-router-dom";

const AddTution = () => {
  const token = localStorage.getItem("authtoken");
  const dispatch = useDispatch();
  const Fileref = useRef();
  const navigate = useNavigate();
  const ErrorComponent = useRef();
  const [TutionData, setTutionData] = useState({});
  const [File, setFile] = useState({});
  const [addLoading, setaddLoading] = useState(false);
  const [Preview, setPreview] = useState(false);
  const [Subjects, setSubjects] = useState([]);
  const [Errors, setErrors] = useState({
    SubjectError: false,
    FileError: false,
  });

  const ShowPreviewImage = (event) => {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      setErrors({ ...Errors, FileError: false });
      setPreview(true);
      setFile(event.target.files[0]);
      //   preview.style.display = "block";
    }
  };
  const AddTution = async () => {
    // setaddLoading(true)
    let Data = new FormData();
    Data.append("file", File);
    Data.append("Data", JSON.stringify(TutionData));
    Data.append("Subjects", JSON.stringify(Subjects));
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/hall-manager/addHall`, Data, {
        headers: { token: token },
      })
      .then((result) => {
        console.log(result);
        setTutionData({});
        setFile({});
        setSubjects({});
        setaddLoading(false);
        dispatch(
          createAlert({
            type: "success",
            message: "Tution Added Successfully",
            options: {
              position: "top-right",
            },
          })
        );
        navigate("/user/hall-manager/halls");
      })
      .catch((err) => {
        console.log(err);
        setaddLoading(false);
        dispatch(
          createAlert({
            type: "error",
            message: err.response.error
              ? err.response.error
              : "Something Went Wrong! Try Again",
            options: {
              position: "top-right",
            },
          })
        );
      });
    // if (Object.keys(Subjects).length !== 0 && Object.keys(File).length !== 0) {
    // } else {
    //   if (
    //     Object.keys(Subjects).length === 0 &&
    //     Object.keys(File).length === 0
    //   ) {
    //     setErrors({ FileError: true, SubjectError: true });
    //     ErrorComponent.current.scrollIntoView();
    //   } else if (Object.keys(Subjects).length === 0) {
    //     setErrors({ ...Errors, SubjectError: true });
    //     ErrorComponent.current.scrollIntoView();
    //   } else if (Object.keys(File).length === 0) {
    //     setErrors({ ...Errors, FileError: true });
    //     ErrorComponent.current.scrollIntoView();
    //   }
    // }
  };
  return (
    <div className="mb-10">
      <h1 className="font-bold text-text_color text-2xl mb-5 pl-2 border-l-[5px] border-hover_color">
        Add a New Hall
      </h1>
      <div
        ref={ErrorComponent}
        className={`w-full p-5 mb-5 border-2 border-dashed border-red-500 rounded-md text-red-500 ${
          Errors.FileError || Errors.SubjectError ? "block" : "hidden"
        }`}
      >
        Following Erros Occured:
        <ul className="list-disc ml-10">
          {Errors.SubjectError && (
            <li>Must Select At least 1 Subject to Continue </li>
          )}
          {Errors.FileError && <li>Must Use Featured Image to continue </li>}
        </ul>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          AddTution();
        }}
      >
        <div className="bg-white p-10 rounded-md shadow-sm grid grid-cols-1 gap-x-5 gap-y-5">
          <div className="col-span-1">
            {/* <label
              for="Title"
              className="font-semibold text-text_color_secondary_2"
            >
              Title
            </label> */}
            <TextField
              name="Title"
              id="Title"
              type={"text"}
              required
              label="Title"
              className="w-full mt-1"
              variant="outlined"
              size="medium"
              value={TutionData?.Title}
              onChange={(e) => {
                setTutionData({
                  ...TutionData,
                  Title: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-span-1">
            <label
              for="description"
              className="font-semibold text-text_color_secondary_2"
            >
              Describe Your Hall
            </label>
            <TextareaAutosize
              id="description"
              name="description"
              aria-label="minimum height"
              minRows={5}
              required
              minLength={5}
              placeholder="Description of Your Service"
              className="w-full border px-2 py-4"
              value={TutionData?.Description}
              onChange={(e) => {
                setTutionData({
                  ...TutionData,
                  Description: e.target.value,
                });
              }}
            />
          </div>
          {/* <div className="col-span-1">
            <div className="flex items-center justify-between">
              <h3
                className={`font-semibold ${
                  Errors.SubjectError
                    ? "text-red-500"
                    : "text-text_color_secondary_2"
                }`}
              >
                Select the Subjects
              </h3>
              {Errors.SubjectError && (
                <p className="text-red-500 italic">Must Select 1 Subject</p>
              )}
            </div>
            <div
              className={`mt-2 bg-gray-100 p-5 rounded-md ${
                Errors.SubjectError && "border-2 border-dashed border-red-500"
              }`}
            >
              <FormControl required>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{ "& .MuiButtonBase-root": { padding: "6px" } }}
                >
                  <div className="flex flex-wrap gap-x-10 gap-y-5">
                    <FormControlLabel
                      value="Math"
                      name="Math"
                      control={<Checkbox />}
                      label="Mathematics"
                      onChange={ChangeSubjects}
                    />
                    <FormControlLabel
                      value="Physics"
                      name="Physics"
                      control={<Checkbox />}
                      label="Physics"
                      onChange={ChangeSubjects}
                    />
                    <FormControlLabel
                      value="Chemistry"
                      name="Chemistry"
                      control={<Checkbox />}
                      label="Chemistry"
                      onChange={ChangeSubjects}
                    />
                    <FormControlLabel
                      value="English"
                      name="English"
                      control={<Checkbox />}
                      label="English"
                      onChange={ChangeSubjects}
                    />
                    <FormControlLabel
                      value="Urdu"
                      name="Urdu"
                      control={<Checkbox />}
                      label="Urdu"
                      onChange={ChangeSubjects}
                    />
                    <FormControlLabel
                      value="IslamicStudies"
                      name="IslamicStudies"
                      control={<Checkbox />}
                      label="Islamic Studies"
                      onChange={ChangeSubjects}
                    />
                    <FormControlLabel
                      value="PakStudies"
                      name="PakStudies"
                      control={<Checkbox />}
                      label="Pakistan Studies"
                      onChange={ChangeSubjects}
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
          </div> */}
          <div className="col-span-1 grid grid-cols-2 gap-x-3 gap-y-3">
            <TextField
              id="price"
              type={"number"}
              required
              label="Price"
              className="w-full"
              variant="outlined"
              size="medium"
              value={TutionData?.Price}
              onChange={(e) => {
                setTutionData({
                  ...TutionData,
                  Price: e.target.value,
                });
              }}
            />
            <TextField
              id="capacity"
              type={"number"}
              required
              label="Capacity"
              className="w-full"
              variant="outlined"
              size="medium"
              value={TutionData?.Capacity}
              onChange={(e) => {
                setTutionData({
                  ...TutionData,
                  Capacity: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-between">
              <h3
                className={`font-semibold ${
                  Errors.FileError
                    ? "text-red-500"
                    : "text-text_color_secondary_2"
                }`}
              >
                Choose Picture:
              </h3>
              {Errors.FileError && (
                <p className="text-red-500 italic"> Image Field is Required</p>
              )}
            </div>

            <div
              className={`${
                Preview ? "block" : "hidden"
              } grid grid-cols-10 gap-5`}
            >
              <div className={`h-64 w-full col-span-8`}>
                <img
                  id="file-ip-1-preview"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <div
                className={`flex flex-col items-center justify-center gap-3 col-span-2`}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => Fileref.current.click()}
                  className="w-full h-fit text-[16px] bg-hover_color flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Change Picture
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    setPreview(false);
                    setFile(null);
                  }}
                  className="w-full h-fit text-[16px] bg-red-500 flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove
                </Button>
              </div>
            </div>

            <div>
              <div
                className={`${
                  Preview ? "hidden" : "block"
                } flex items-center justify-center w-full`}
              >
                <label
                  for="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                    Errors.FileError ? "border-red-500" : "border-gray-300"
                  }  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className={`w-10 h-10 mb-3 text-gray-400 ${
                        Errors.FileError ? "text-red-500" : "text-gray-500 "
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p
                      className={`mb-2 text-sm ${
                        Errors.FileError ? "text-red-500" : "text-gray-500 "
                      }`}
                    >
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p
                      className={`text-xs ${
                        Errors.FileError ? "text-red-500" : "text-gray-500 "
                      }`}
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    ref={Fileref}
                    type="file"
                    className="hidden"
                    onChange={ShowPreviewImage}
                    accept="image/*"
                  />
                </label>
              </div>
              {Errors.FileError && (
                <p className="text-red-500 italic"> Image Field is Required</p>
              )}
            </div>
          </div>
          <div className="col-span-1 mt-5">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={addLoading ? true : false}
              className="w-full text-[16px] bg-hover_color flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addLoading ? (
                <CircularProgress
                  size={18}
                  disableShrink
                  sx={{ color: "white" }}
                />
              ) : (
                <>
                  <RxReader className="mr-1" />
                  Add Hall
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTution;
