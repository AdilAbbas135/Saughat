import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import "./CardGenerator.css";
import { Button } from "@mui/material";
import { Print } from "@mui/icons-material";
import UserSpeedDial from "../Home/SpeedDial/UserSpeedDial";
const CardGenerator = () => {
  // User Data
  const auth = useSelector((state) => state.authReducer);
  const { isLogged } = auth;
  // React-to-pdf

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    pageStyle: {
      size: "a5 landscape",
      margin: 0,
    },
    content: () => componentRef.current,
  });

  const [name, setName] = React.useState("");
  const [name1, setName1] = React.useState("");
  const [date, setDate] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [recption, setReception] = React.useState("");
  const [dinner, setDinner] = React.useState("");
  return (
    <div>
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}
      <div ref={componentRef}>
        <div className="sakura-falling"></div>
        <div style={{}}>
          <img
            src="https://i.imgur.com/dGOOfnA.png"
            alt=""
            className="top-right-decoration"
          />
          <img
            src="https://i.imgur.com/t6ffnbn.png"
            alt=""
            className="top-left-decoration"
          />
          <section id="media"></section>
          <div className="wrap">
            <div className="title">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "80px",
                }}
              >
                <span className="title1">Mr. & Mrs.</span>
                <input placeholder="Majid Jahangir" className="name1" />
              </div>
              <br />
              <span className="details1">
                Request the pleasure of your company at the Wedding Ceremony of
                their beloved
              </span>
              <input
                className="details1"
                placeholder="Son"
                style={{
                  width: "10%",
                  border: "none",
                  fontFamily: "Avro",
                  marginLeft: "5px",
                  color: "grey",
                  fontWeight: "600",
                }}
              />
              <input
                className="name"
                value={name}
                placeholder="Muhammad Waqas Sarwar"
                onChange={(e) => setName(e.target.value)}
              />
              <h2>with</h2>
              <input
                className="name"
                value={name1}
                placeholder="Amal Sajjad"
                onChange={(e) => setName1(e.target.value)}
              />
              <p className="dateAndTime">
                on
                <input
                  className="date"
                  placeholder="29 November 2022"
                  onChange={(e) => setDate(e.target.value)}
                />
                , At
                <input
                  className="place"
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Aura Grande Islamabad"
                />
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/reception.png"
                  width={40}
                  height={20}
                  alt="reception"
                />
                <span
                  className="date"
                  style={{ fontSize: "18px", marginLeft: "-30px" }}
                >
                  Reception:{" "}
                  <input
                    className="date"
                    placeholder="7 Pm"
                    style={{ fontSize: "15px" }}
                    onChange={(e) => setReception(e.target.value)}
                  />
                </span>
                <img
                  src="/images/dinner.png"
                  width={40}
                  height={40}
                  alt="dinner"
                />
                <span
                  className="date"
                  style={{ fontSize: "18px", marginLeft: "-30px" }}
                >
                  Dinner:{" "}
                  <input
                    className="date"
                    placeholder="8:30 Pm"
                    style={{ fontSize: "15px" }}
                    onChange={(e) => setDinner(e.target.value)}
                  />{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="time">Bless the married couple for happy life!</div>

          <p className="footer">
            Can't wait to celebrate auspicious moment of our family with you!{" "}
            <br />
            <br />
            Just a ping away for any queries:{" "}
            <input
              className="date"
              placeholder="+923345561612"
              onChange={(e) => setPhone(e.target.value)}
            />
            <span></span>
          </p>
          <div className="music">
            <audio
              src="./assets/mp3/song.mp3"
              id="my_audio"
              loop="loop"
            ></audio>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button color="success" variant="contained" onClick={handlePrint}>
          <Print sx={{ marginRight: "5px" }} />
          {"  "}
          Print
        </Button>
      </div>
    </div>
  );
};

export default CardGenerator;
