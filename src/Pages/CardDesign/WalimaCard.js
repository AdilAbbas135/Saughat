import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import "./CardGenerator.css";
import UserSpeedDial from "../Home/SpeedDial/UserSpeedDial";
import reception from "../../images/reception.png";
import dinner1 from "../../images/dinner.png";
import s3 from "../../images/s3.png";
import t2 from "../../images/t2.png";
import { Button } from "@mui/material";
import { Print } from "@mui/icons-material";
const WalimaCard = () => {
  // User Data
  const auth = useSelector((state) => state.authReducer);

  const { isLogged } = auth;

  // React-to-pdf

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    copyStyles: true,
    pageStyle: { size: "297mm 210mm" },
    content: () => componentRef.current,
  });

  // states
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
        <div>
          <img
            src={s3}
            alt="image-top-right"
            className="top-right-decoration"
            style={{
              width: "26%",
              marginRight: "20px",
              top: "-35px",
              transform: "rotate(90deg)",
            }}
          />
          <img
            src={s3}
            alt="image-top-left"
            className="top-left-decoration"
            style={{ width: "28%", marginLeft: "-12px", maginTop: "-10px" }}
          />
          <img
            src={t2}
            alt="image-bottom-right"
            className="bottom-right-decoration"
            style={{
              position: "absolute",
              bottom: 130,
              right: 20,
              display: "block",
            }}
          />

          <section id="media"></section>
          <div className="wrap">
            <div className="title">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "70px",
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
                  //   color: "grey",
                  color: "#874562",
                  fontWeight: "900",
                  //   fontFamily: "Arvo",
                }}
              />
              <input
                className="name"
                value={name}
                placeholder="Muhammad Waqas Sarwar"
                onChange={(e) => setName(e.target.value)}
              />
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft:"-100px"
                }}
              >
                with
              </h2>
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
                  style={{width:"150px"}}
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
                <img src={reception} width={40} height={20} alt="reception" />
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
                <img src={dinner1} width={40} height={40} alt="dinner" />
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
          {/* <p className="dance-med">dinner & dancing to follow</p> */}
          <div className="actions">
            {/* <a href="https://goo.gl/maps/5z5xX2hTYzU8VGEJ9" target="_blank">
          <div className="venue">SEE THE VENUE</div>
        </a>
        <a
          href="https://github.com/vinitshahdeo/vinitshahdeo/raw/master/docs/Sonali%20%26%20Gagan.pdf"
          download="Invitation | 23 Nov | Hope to see you there!"
        >
        </a> */}
            {/* <div className="venue1">DOWNLOAD INVITATION CARD</div> */}
          </div>
          <p className="footer">
            Can't wait to celebrate auspicious moment of our family with you!{" "}
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

export default WalimaCard;
