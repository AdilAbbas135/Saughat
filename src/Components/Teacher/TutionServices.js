import { Button } from "@material-tailwind/react";
import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  FormControl,
  FormControlLabel,
  Modal,
  RadioGroup,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { RxReader } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createAlert } from "../../Redux/Alert";

const TutionServices = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authtoken");
  const [loading, setloading] = useState(false);
  const [addLoading, setaddLoading] = useState(false);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [allTutions, setallTutions] = useState([]);
  const [TutionData, setTutionData] = useState({});
  const [SelectedTution, setSelectedTution] = useState({});

  // MODAL VARIABLES
  const [openModal, setOpenModal] = useState(false);
  const [Subjects, setSubjects] = useState({
    Mathematics: false,
    Physics: false,
    Chemistry: false,
    English: false,
    PakStudies: false,
    IslamicStudies: false,
  });
  const ModalStyles = {
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };
  const ChangeSubject = (event) => {
    setSubjects({
      ...Subjects,
      [event.target.name]: event.target.checked,
    });
  };

  // DELETE CONFIRM DIALOG
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedTution({});
  };
  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  // GLOBAL FUNCTIONS
  const FetchTutions = () => {
    setloading(true);
    const token = localStorage.getItem("authtoken");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/tutions`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setallTutions(result.data?.tutions);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const AddTution = async () => {
    setaddLoading(true);
    var keys = Object.keys(Subjects);
    var AllSubjects = keys.filter(function (key) {
      return Subjects[key];
    });
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/tutions/addTution`,
        { TutionData, AllSubjects },
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setTutionData({});
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
        setOpenModal(false);
        FetchTutions();
      })
      .catch((err) => {
        console.log(err);
        setaddLoading(false);
        dispatch(
          createAlert({
            type: "error",
            message: "Something Went Wrong! Try Again",
            options: {
              position: "top-right",
            },
          })
        );
      });
  };
  const DeleteTution = async () => {
    setdeleteLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/tutions/deleteTution/${SelectedTution._id}`,
        {},
        { headers: { token: token } }
      )
      .then((result) => {
        console.log(result);
        setdeleteLoading(false);
        dispatch(
          createAlert({
            type: "success",
            message: "Tution Deleted Successfully",
            options: {
              position: "top-right",
            },
          })
        );
        handleCloseConfirmModal();
        FetchTutions();
      })
      .catch((error) => {
        setdeleteLoading(false);
        dispatch(
          createAlert({
            type: "error",
            message: "Something Went Wrong! Try Again",
            options: {
              position: "top-right",
            },
          })
        );
        console.log(error);
      });
  };
  useEffect(() => {
    FetchTutions();
    //  eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <div className="mb-2 flex justify-between">
        <h1 className="font-bold text-text_color text-2xl mb-5 pl-1 border-l-[5px] border-hover_color">
          My Tution Servies
        </h1>
        <Button
          onClick={() => setOpenModal(true)}
          className="px-5 py-2 h-fit bg-hover_color shadow-none hover:shadow-none  font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all"
        >
          <IoMdAddCircleOutline className="mr-1" /> Add Service
        </Button>
      </div>
      {/* ADD TUTION SERVICE MODAL */}
      {openModal && (
        <Modal
          keepMounted
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <div
            style={ModalStyles}
            className="w-[calc(100%-20px)] md:w-[700px] bg-white absolute top-1/2 left-1/2 px-4 py-5 rounded-md"
          >
            <h1 className="text-center font-bold text-3xl mb-5 ">
              Add Tution Service
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AddTution();
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
                    value={TutionData?.Title}
                    onChange={(e) => {
                      setTutionData({
                        ...TutionData,
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
                <div className="col-span-2">
                  <Select
                    className="w-full"
                    // value={postvalue}
                    // displayEmpty
                    // required
                    // onChange={(e) => {
                    //   setpostvalue(e.target.value);
                    //   setquestiondata({
                    //     ...questiondata,
                    //     Status: e.target.value,
                    //   });
                    // }}
                  >
                    <div className="px-5">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          sx={{ "& .MuiButtonBase-root": { padding: "6px" } }}
                        >
                          <FormControlLabel
                            value="Math"
                            control={
                              <Checkbox
                                checked={Subjects.Mathematics}
                                onChange={ChangeSubject}
                                name={"Mathematics"}
                              />
                            }
                            label="Mathematics"
                          />
                          <FormControlLabel
                            value="Physics"
                            control={
                              <Checkbox
                                checked={Subjects.Physics}
                                onChange={ChangeSubject}
                                name={"Physics"}
                              />
                            }
                            label="Physics"
                          />
                          <FormControlLabel
                            value="chemistry"
                            control={
                              <Checkbox
                                checked={Subjects.Chemistry}
                                onChange={ChangeSubject}
                                name={"Chemistry"}
                              />
                            }
                            label="Chemistry"
                          />
                          <FormControlLabel
                            value="English"
                            control={
                              <Checkbox
                                checked={Subjects.English}
                                onChange={ChangeSubject}
                                name={"English"}
                              />
                            }
                            label="English"
                          />
                          <FormControlLabel
                            value="Pak Studies"
                            control={
                              <Checkbox
                                checked={Subjects.PakStudies}
                                onChange={ChangeSubject}
                                name={"PakStudies"}
                              />
                            }
                            label="Pak Studies"
                          />
                          <FormControlLabel
                            value="Islamic Studies"
                            control={
                              <Checkbox
                                checked={Subjects.IslamicStudies}
                                onChange={ChangeSubject}
                                name={"IslamicStudies"}
                              />
                            }
                            label="Islamic Studies"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Select>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="fees"
                    type={"number"}
                    required
                    label="Fees"
                    className="w-full"
                    variant="outlined"
                    size="medium"
                    value={TutionData?.Fees}
                    onChange={(e) => {
                      setTutionData({
                        ...TutionData,
                        Fees: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-span-2 grid grid-cols-1 tablets:grid-cols-2 gap-x-2 gap-y-3">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={addLoading ? true : false}
                    className="bg-hover_color flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
                        Add Service
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    onClick={() => setOpenModal(false)}
                    className="border border-red-500 text-red-500 flex items-center justify-center shadow-none hover:shadow-none rounded-[4px] font-semibold"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {openConfirmModal && (
        <Dialog
          open={openConfirmModal}
          onClose={handleCloseConfirmModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="px-10 py-5 flex flex-col items-center justify-center space-y-3">
            <img
              src="/assets/icons8-warning-shield-64.png"
              className="h-[100px] w-[100px] object-cover"
              alt=""
            />
            <h1 className="text-2xl font-bold">
              Do You Really Want to delete?
            </h1>
            <p className="px-3 py-1 bg-blue-200 w-fit font-semibold italic rounded-sm">
              {SelectedTution?.Title}
            </p>
            <DialogActions>
              <Button
                onClick={handleCloseConfirmModal}
                className="text-red-500 border border-red-500 px-5 py-3 shadow-none hover:shadow-none"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  DeleteTution();
                }}
                disabled={deleteLoading ? true : false}
                className="text-white bg-hover_color px-5 py-3 shadow-none hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteLoading ? (
                  <CircularProgress
                    size={18}
                    disableShrink
                    sx={{ color: "white" }}
                  />
                ) : (
                  <>Confirm</>
                )}
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      )}

      {loading ? (
        <div className="min-h-[100px] w-full flex space-x-2 items-center justify-center">
          <CircularProgress disableShrink /> <h1>Loading..</h1>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 gap-y-3">
          {allTutions.length === 0 ? (
            <p className="italic text-red-500">No Services Added Yet</p>
          ) : (
            allTutions.map((elem, index) => {
              return (
                <div
                  key={index}
                  className="bg-white h-fit border-2 border-gray-100 p-5 rounded-md transition-all hover:shadow-md"
                >
                  <h1 className="font-semibold text-hover_color text-xl mb-1">
                    {elem?.Title}
                  </h1>
                  <p className="text-text_color_secondary_2 text-sm mb-3">
                    {elem?.Description}
                  </p>
                  {elem.Subjects.map((elem2, index2) => {
                    return (
                      <div key={index2} className="flex items-center space-x-2">
                        <img
                          src="/assets/icons8-checked-checkbox-96.png"
                          alt=""
                          className="h-[20px] w-[20px]"
                        />
                        <h1>{elem2}</h1>
                      </div>
                    );
                  })}
                  <p className="my-3 py-2 w-fit px-3 bg-[#d1ecf1] rounded-md text-sm">
                    Fee{" "}
                    <span className="font-bold text-hover_color">
                      {elem?.Fee}
                    </span>{" "}
                    /Per Month
                  </p>

                  <div className=" flex items-center space-x-2">
                    <Button className="flex-1 bg-hover_color shadow-none hover:shadow-none py-2 font-semibold rounded-md flex items-center justify-center hover:bg-main_bg_color transition-all">
                      <BiEditAlt className="mr-1" /> Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedTution(elem);
                        handleOpenConfirmModal();
                      }}
                      className=" flex-1 bg-transparent border-2 border-red-500 text-red-500 shadow-none hover:shadow-none py-[7px] font-semibold rounded-md flex items-center justify-center hover:text-white hover:bg-red-500 transition-all"
                    >
                      <MdDeleteOutline className="mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TutionServices;
