const express = require("express");
const AllUsersModel = require("../../Models/Allusers");
const router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const VerifyToken = require("../../Middlewear/VerifyToken");
const HallsManagerModel = require("../../Models/HallManager/HallManager");
const multer = require("multer");
const HallModel = require("../../Models/HallManager/Hall");
const FoodModel = require("../../Models/Food");
const BookingModel = require("../../Models/HallManager/Booking");
const { default: mongoose } = require("mongoose");
const EventOrganizerModel = require("../../Models/EventOrganizer/EventOrganizer");
const FoodBookingModel = require("../../Models/FoodBooking");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const name =
      new Date().getTime() + "-" + req.user.profileId + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// FIND HallManager AT POST REQUEST AND RETURNS HallManager DATA
router.post("/", VerifyToken, async (req, res) => {
  if (req.method === "POST") {
    try {
      const student = await EventOrganizerModel.findOne({
        _id: req.user?.profileId,
        userId: req.user?.userId,
      });
      if (student) {
        return res.status(200).json({ Success: true, EventOrganizer: student });
      } else {
        res.status(404).json({
          Success: false,
          msg: "No user Found with this userId and pofileId",
        });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.status(404).json({
      Success: false,
      msg: "You are only allowed to find user with post method",
    });
  }
});
// CREATE EVENT ORGANIZER PROFILE ACCOUNT
router.post("/createprofile", async (req, res) => {
  // console.log(req.body);
  try {
    const student = await EventOrganizerModel.findOne({
      Email: req.body.Email,
    });
    if (!student) {
      const newStudent = await EventOrganizerModel.create({
        FirstName: req.body.FirstName ? req.body.FirstName : "",
        LastName: req.body.LastName ? req.body.LastName : "",
        Email: req.body.Email,
        AccountType: req.body.provider,
        ProfilePicture: req.body.photo ? req.body.photo : "",
        userId: req.body.userId,
      });
      if (newStudent) {
        let updateUserModel = undefined;
        if (req.body.provider === "google.com") {
          updateUserModel = await AllUsersModel.findByIdAndUpdate(
            newStudent.userId,
            {
              profileId: newStudent._id,
              userRole: "student",
            }
          );
        } else if (req.body.provider === "email") {
          // HERE WE WILL PUT THE PASSWORD FOR THE STUDENT
          const salt = await bcrypt.genSalt(10);
          const Password = await bcrypt.hash(req.body.Password, salt);
          updateUserModel = await AllUsersModel.findByIdAndUpdate(
            newStudent.userId,
            {
              profileId: newStudent._id,
              userRole: "event-organizer",
              Password: Password,
            }
          );
        }

        if (updateUserModel) {
          const authtoken = jwt.sign(
            {
              userId: newStudent.userId,
              profileId: newStudent._id,
              email: newStudent.Email,
              ProfilePicture: newStudent.ProfilePicture,
              role: "event-organizer",
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          return res.status(200).json({
            success: true,
            User: updateUserModel,
            Profile: newStudent,
            authtoken,
            msg: "event-organizer profile creaed and user model updated successfully",
          });
        } else {
          res.status(400).json({
            success: true,
            Profile: newStudent,
            msg: "profile created but user model was not updated",
          });
        }
      } else {
        return res
          .status(404)
          .json({ success: false, msg: "Error in creating the user account" });
      }
    } else {
      const authtoken = jwt.sign(
        {
          userId: student.userId,
          ProfileId: student._id,
          email: student.Email,
          role: "event-organizer",
          ProfilePicture: student.ProfilePicture,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        success: true,
        Profile: student,
        msg: "User Already exist with this email",
        authtoken,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// FIND ALL Bookings RELATED TO A SPECIFIC HALL MANAGER
router.post("/bookings", VerifyToken, async (req, res) => {
  try {
    const Bookings = await BookingModel.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(req?.user?.profileId),
        },
      },
      {
        $lookup: {
          from: "halls",
          localField: "HallId",
          foreignField: "_id",
          as: "Hall",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    const FoodBookings = await FoodBookingModel.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(req?.user?.profileId),
        },
      },
      {
        $lookup: {
          from: "foods",
          localField: "FoodId",
          foreignField: "_id",
          as: "FoodDetail",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res
      .status(200)
      .json({ success: true, Halls: Bookings, Food: FoodBookings });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Error in finding Bookings" });
  }
});
module.exports = router;
