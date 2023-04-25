import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { GiPerson } from "react-icons/gi";
import { RxReader } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import {
  TextField,
  TextareaAutosize,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const QuestionsTab = () => {
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
  const [questiondata, setquestiondata] = useState({});
  const [allquestions, setallquestions] = useState([]);

  const PostQuestion = async () => {
    const token = localStorage.getItem("authtoken");
    const data = {
      questiondata,
    };
    await toast.promise(
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/qahub/postquestion`, data, {
          headers: { token: token },
        })
        .then((result) => {
          setquestiondata({ Title: "", Description: "" });
          setpostvalue("");
          setOpen(false);
          FetchQuestions();
        })
        .catch((err) => {
          // console.log(err);
        }),
      {
        pending: "Posting Question!",
        success: "Question Uploaded Successfully",
        error: "Error in Udloading Question",
      },
      {
        toastId: "qwertytds",
      }
    );
  };

  const FetchQuestions = async (deletefunc) => {
    setloading(true);
    const token = localStorage.getItem("authtoken");
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/qahub/findquestions`, {
        token,
      })
      .then((result) => {
        console.log(result);
        setallquestions(result.data?.questions);
        setloading(false);
      })
      .catch((err) => {
        if (deletefunc) {
          setloading(false);
        }
        console.log(err);
      });
  };

  const DeleteQuestion = async (questionid) => {
    setdeletebtnloading(true);
    const token = localStorage.getItem("authtoken");
    const data = { questionid };
    await toast.promise(
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/qahub/deletequestion`,
          data,
          { headers: { token: token } }
        )
        .then((result) => {
          console.log(result);
          if (result.data.Success) {
            const deletefunc = true;
            FetchQuestions(deletefunc);
          }
        })
        .catch((err) => {
          console.log(err);
        }),
      {
        pending: "Deleting Question!",
        success: "Question Deleted Successfully",
        error: "Error in Deleting Question",
      },
      {
        toastId: "deletetoast",
      }
    );
    setdeletebtnloading(false);
  };

  useEffect(() => {
    FetchQuestions();
    //  eslint-disable-next-line
  }, []);

  return (
    <div className="pb-10 w-full ">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="">
            <h1 className="text-2xl font-bold text-black">Your Questions</h1>
            <p className="">
              A list of all the questions that you posted and all the detail
              regarding them
            </p>
          </div>
          <div className="AddQuestion flex items-center space-x-3">
            <button
              // disabled={loading ? true : false}
              onClick={handleOpen}
              className="disabled:opacity-50 disabled:cursor-not-allowed group relative w-fit py-2 rounded-md border border-transparent bg-hover_color  px-4 text-white hover:bg-main-red-color-2 focus:outline-none focus:ring-2 focus:ring-main-red-color-2 focus:ring-offset-2 text-md font-bold uppercase flex items-center justify-center"
            >
              Add Question
            </button>
            <a href="/qahub" target="_blank" rel="noreffer" className="h-full">
              <Button
                variant="text"
                className="w-fit h-full font-semibold text-hover_color"
                size="small"
              >
                Open Q&A Hub <FiExternalLink />
              </Button>
            </a>
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
                    PostQuestion();
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
            {allquestions.length > 0 ? (
              allquestions.map((question, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex flex-col rounded-md overflow-hidden bg-white shadow-sm border border-gray-200"
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
                          <GiPerson size={17} /> {question.PeopleApplied.length}{" "}
                          people applied
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
                          onClick={() => {
                            DeleteQuestion(question._id);
                          }}
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

export default QuestionsTab;
