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
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DiscussionTab = ({ BACKEND_URL }) => {
  const token = localStorage.getItem("authtoken");
  const [loading, setloading] = useState(true);
  const [deletebtnloading, setdeletebtnloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [postvalue, setpostvalue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };
  const [allDiscussions, setallDiscussions] = useState([]);
  const [questiondata, setquestiondata] = useState({});

  const PostDiscussion = async () => {
    await toast.promise(
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/discussion/create-discussion`,
          questiondata,
          {
            headers: { token: token },
          }
        )
        .then((result) => {
          setquestiondata({ Title: "", Description: "" });
          setpostvalue("");
          setOpen(false);
          FetchAllDiscussions();
        })
        .catch((err) => {
          // console.log(err);
        }),
      {
        pending: "Posting Discussion!",
        success: "Discussion Uploaded Successfully",
        error: "Error in Udloading Discussion",
      },
      {
        toastId: "discussion-upload",
      }
    );
  };

  const FetchAllDiscussions = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/discussion`,
        {},
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        setallDiscussions(response.data);
        setloading(false);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    FetchAllDiscussions();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="pb-10 w-full ">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="">
            <h1 className="text-2xl font-bold text-black">Your Discussions</h1>
            <p className="">
              A list of all the Discussion Posted by You is Showing here
            </p>
          </div>
          <div className="AddQuestion flex space-x-3">
            <button
              // disabled={loading ? true : false}
              onClick={handleOpen}
              className="disabled:opacity-50 disabled:cursor-not-allowed group relative w-fit py-2 rounded-md border border-transparent bg-hover_color  px-4 text-white hover:bg-main-red-color-2 focus:outline-none focus:ring-2 focus:ring-main-red-color-2 focus:ring-offset-2 text-md font-bold uppercase flex items-center justify-center"
            >
              Add Discussion
            </button>
            <Button
              variant="text"
              className="w-fit font-semibold text-hover_color"
              size="small"
            >
              Discussion Page <FiExternalLink className="ml-1" />
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
                <h1 className="text-center font-bold text-3xl mb-5 ">
                  Post Your Problem
                </h1>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    PostDiscussion();
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                    <div className="col-span-2">
                      <TextField
                        id="Title"
                        type={"text"}
                        required
                        label="Title"
                        className="w-full"
                        variant="outlined"
                        size="medium"
                        value={questiondata?.Title}
                        onChange={(e) => {
                          setquestiondata({
                            ...questiondata,
                            Title: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        required
                        minLength={5}
                        placeholder="Explain Your Problem/Question"
                        className="w-full border px-2 py-4"
                        value={questiondata?.Description}
                        onChange={(e) => {
                          setquestiondata({
                            ...questiondata,
                            Description: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <Select
                        className="w-full"
                        value={postvalue}
                        displayEmpty
                        required
                        onChange={(e) => {
                          setpostvalue(e.target.value);
                          setquestiondata({
                            ...questiondata,
                            Status: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value="" disabled>
                          Post Status
                        </MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                      </Select>
                    </div>
                    <div className="col-span-2 grid grid-cols-1 tablets:grid-cols-2 gap-x-2 gap-y-3">
                      <Button type="submit" variant="contained" size="large">
                        <RxReader />
                        Post Problem!
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
          <div className="mt-5 grid grid-cols-1 tablets:grid-cols-2  md:grid-cols-2 lg:grid-cols-3  gap-x-3 gap-y-5">
            {allDiscussions.length > 0 ? (
              allDiscussions.map((question, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex flex-col rounded-md overflow-hidden bg-white shadow-sm border border-gray-200"
                  >
                    {question.Status ? (
                      <div className="text-sm rounded-md absolute top-3 right-3 bg-hover_color text-white px-2 py-1  flex items-center">
                        active
                      </div>
                    ) : (
                      <div className="text-sm rounded-md absolute top-3 right-3 bg-red-500 text-white px-2 py-1 flex items-center">
                        Draft
                      </div>
                    )}
                    <div className="detailContainer px-5 py-5">
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
                          {/* <GiPerson size={17} /> {question.PeopleApplied.length}{" "} */}
                          24 Answers
                        </p>
                      </div>
                      <div className="w-full mt-4 grid grid-cols-3 gap-2">
                        <div>
                          <Link to={question._id} className="w-full">
                            <Button
                              variant="outlined"
                              className="w-full"
                              size="medium"
                            >
                              <RxReader size={17} className="mr-1" />
                              VIEW
                            </Button>
                          </Link>
                        </div>
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
                          // onClick={() => {
                          //   DeleteQuestion(question._id);
                          // }}
                        >
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
