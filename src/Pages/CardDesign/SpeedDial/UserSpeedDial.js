import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TextsmsIcon from "@mui/icons-material/Textsms";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  CloseOutlined,
  Spellcheck,
  Mail,
  Article,
  CreditScore,
} from "@mui/icons-material";

const UserSpeedDial = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const auth = useSelector((state) => state.authReducer);

  const { user } = auth;
  console.log(user);

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");

      localStorage.removeItem("firstLogin");

      window.location.href = "/login";
    } catch (error) {
      window.location.href = "/";
    }
  };

  const [msgModal, setMsgModal] = useState(false);

  const handleSubmitMsg = async () => {
    try {
      await axios.post("/user/complain", { msg: message, user: user._id });
      alert("Complain has been sent to the admin");
    } catch (error) {
      console.log(error);
    }
  };
  const submitMsgModalToggle = () => {
    msgModal ? setMsgModal(false) : setMsgModal(true);
  };

  const getChat = async () => {
    const res = await axios.post("/chat/getChat", { userId: user._id });
    navigate("/userchat", { state: { chatID: res.data[0]._id } });
  };
  return (
    <>
      <div>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
          ariaLabel="Navigation speed dial"
          direction="down"
          sx={{ position: "fixed", top: 6, right: 16, borderRadius: "100%" }}
          icon={
            <img
              src={user.avatar}
              alt=""
              style={{ height: "60px", width: "60px", borderRadius: "100%" }}
            />
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <SpeedDialAction
            icon={<PersonIcon />}
            tooltipTitle="Profile"
            onClick={() => navigate("/userProfile")}
          />
          <SpeedDialAction
            icon={<TextsmsIcon />}
            tooltipTitle="Chat"
            onClick={getChat}
          />
          <SpeedDialAction
            icon={<ShoppingCartIcon />}
            tooltipTitle="Cart"
            onClick={() => navigate("/cart")}
          />
          <SpeedDialAction
            icon={<CreditScore />}
            tooltipTitle="Orders"
            onClick={() => navigate("/userOrders")}
          />
          <SpeedDialAction
            icon={
              <img
                src={"/images/invitation.png"}
                style={{ height: "20px", width: "20px" }}
                alt=""
              />
            }
            tooltipTitle="Card Generator 1"
            onClick={() => navigate("/cardGenerator")}
          />
          <SpeedDialAction
            icon={
              <img
                src={"/images/invitation.png"}
                style={{ height: "20px", width: "20px" }}
                alt=""
              />
            }
            tooltipTitle="Card Generator 2"
            onClick={() => navigate("/walimaCard")}
          />
          <SpeedDialAction
            icon={<DescriptionIcon />}
            tooltipTitle="Complain"
            onClick={submitMsgModalToggle}
          />
          <SpeedDialAction
            icon={<LogoutIcon />}
            tooltipTitle="Logout"
            onClick={handleLogout}
          />
        </SpeedDial>
      </div>

      {/* Complaint Modal */}
      <div>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={msgModal}
          onClose={submitMsgModalToggle}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            Complain
            <CloseOutlined
              sx={{
                marginLeft: "130px",
                marginTop: "-30px",
                cursor: "pointer",
                color: "red",
              }}
              onClick={submitMsgModalToggle}
            />
          </DialogTitle>
          <Divider />
          <DialogContent
            className="submitDialog"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="Name"
              placeholder="Name"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Spellcheck />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              placeholder="Email"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Complain"
              placeholder="Complain"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Article />
                  </InputAdornment>
                ),
              }}
            />
            {/* <input
              type="text"
              placeholder="Name"
              style={{
                // outline: "none",
                padding: "10px",
                font: "300 1rem ",
              }}
            />
            <input
              type="text"
              placeholder="Email"
              style={{
                outline: "none",
                padding: "10px",
                font: "300 1rem ",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            />
            <textarea
              className="submitDialogTextArea"
              placeholder="Complain"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                outline: "none",
                padding: "2rem",
                font: "300 1rem ",
              }}
            ></textarea> */}
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmitMsg}
              sx={{ bgColor: "secondary.main" }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default UserSpeedDial;
