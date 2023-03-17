import {
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { GiPerson } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { RxReader } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";

const DiscussionTab = ({ BACKEND_URL }) => {
  // eslint-disable-next-line
  const [loading, setloading] = useState(true);
  // eslint-disable-next-line
  const [deletebtnloading, setdeletebtnloading] = useState(false);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [postvalue, setpostvalue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };
  // eslint-disable-next-line
  const [questiondata, setquestiondata] = useState({});
  // eslint-disable-next-line
  const [allquestions, setallquestions] = useState([]);
  return (
    <div className="mt-5 pb-10 w-full ">
      <div className="px-5 md:px-10 py-10 rounded-md border bg-white shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="">
            <h1 className="text-2xl font-bold text-black">Discussion</h1>
            <p className="">
              A list of all the Discussion Posted by You is Showing here
            </p>
          </div>
          <div className="AddQuestion flex space-x-3">
            <Button
              onClick={handleOpen}
              variant="contained"
              className="w-fit font-semibold"
              size="large"
            >
              Add Topic
            </Button>
            <Button variant="text" className="w-fit font-semibold" size="small">
              Discussion Panel <FiExternalLink />
            </Button>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={style}
                className="w-[calc(100%-20px)] md:w-[700px] bg-white absolute top-1/2 left-1/2 px-4 py-5 rounded-md"
              >
                <h1 className="text-center font-bold text-3xl">
                  Discussion Topic
                </h1>
                <span className="block mx-auto h-1 w-20 bg-main_bg_color rounded-lg my-3 mb-5"></span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // PostQuestion();
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                    <div className="col-span-2">
                      <TextField
                        id="topic"
                        type={"text"}
                        required
                        label="Topic Name"
                        className="w-full"
                        variant="outlined"
                        size="medium"
                      />
                    </div>
                    <div className="col-span-2">
                      <TextareaAutosize
                        id="desc"
                        aria-label="minimum height"
                        minRows={5}
                        required
                        minLength={5}
                        placeholder="Explain Your Topic"
                        className="w-full border px-2 py-4"
                      />
                    </div>
                    <div className="col-span-2">
                      <Select
                        className="w-full"
                        value={postvalue}
                        displayEmpty
                        required
                        // onChange={(e) => {
                        //   setpostvalue(e.target.value);
                        //   setquestiondata({
                        //     ...questiondata,
                        //     Status: e.target.value,
                        //   });
                        // }}
                      >
                        <MenuItem value="" disabled>
                          Status
                        </MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                      </Select>
                    </div>
                    <div className="col-span-2 grid grid-cols-1 tablets:grid-cols-2 gap-x-2 gap-y-3">
                      <Button type="submit" variant="contained" size="large">
                        <RxReader />
                        Post Discussion!
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="large"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
        {loading ? (
          <div className="h-[200px] mt-5 w-full flex space-x-2 items-center justify-center">
            <CircularProgress /> <h1>Loading..</h1>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 tablets:grid-cols-2  md:grid-cols-2 lg:grid-cols-3  gap-x-2 gap-y-5">
            {allquestions.length > 0 ? (
              allquestions.map((question, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex flex-col rounded-md overflow-hidden shadow-lg border"
                  >
                    {question.isActive ? (
                      <div className="text-sm rounded-md absolute top-3 right-3 bg-hover_color text-white px-2 py-1  flex items-center">
                        active
                      </div>
                    ) : (
                      <div className="text-sm rounded-md absolute top-3 right-3 bg-red-500 text-white px-2 py-1 flex items-center">
                        Draft
                      </div>
                    )}
                    <div className="detailContainer px-3 py-5">
                      <span className="fpName text-2xl uppercase font-bold font-sans ">
                        {question.Title}
                      </span>
                      <p className="text-justify">
                        {question?.Description?.length > 100
                          ? question.Description.substring(0, 100)
                          : question.Description}
                        ...
                      </p>

                      <div className="mt-3 bg-main_color_2 px-2 py-1 rounded-md w-fit">
                        <p className="text-sm flex items-center">
                          <GiPerson size={17} /> {question.PeopleApplied.length}{" "}
                          people applied
                        </p>
                      </div>
                      <div className="w-full mt-4 flex space-x-2">
                        <Button
                          variant="outlined"
                          className="flex-1"
                          size="medium"
                        >
                          <RxReader size={17} className="mr-1" />
                          VIEW
                        </Button>
                        <Button
                          variant="outlined"
                          className="flex-1"
                          size="medium"
                        >
                          <CiEdit size={17} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          key={index}
                          color="error"
                          className="flex-1 flex items-center justify-center"
                          size="medium"
                          disabled={deletebtnloading ? true : false}
                          onClick={() => {
                            // DeleteQuestion(question._id);
                          }}
                        >
                          {/* {deletebtnloading ? (
                        <span>
                          <CircularProgress color="inherit" size={20} />
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <MdDeleteOutline size={17} className="mr-1 " />
                          DELETE
                        </span>
                      )} */}
                          <MdDeleteOutline size={17} className="mr-1 " />
                          DELETE
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-red-500">No Question Posted Yet!</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionTab;
