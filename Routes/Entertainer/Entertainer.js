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
const EntertainerModel = require("../../Models/Entertainer/Entertainer");
const EntertainerServicesModel = require("../../Models/Entertainer/Services");
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

// FIND Entertainer AT POST REQUEST AND RETURNS HallManager DATA
router.post("/", VerifyToken, async (req, res) => {
  if (req.method === "POST") {
    try {
      const student = await EntertainerModel.findOne({
        _id: req.user?.profileId,
        userId: req.user?.userId,
      });
      if (student) {
        return res.status(200).json({ Success: true, Entertainer: student });
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
    const student = await EntertainerModel.findOne({
      Email: req.body.Email,
    });
    if (!student) {
      const newStudent = await EntertainerModel.create({
        FirstName: req.body.FirstName ? req.body.FirstName : "",
        LastName: req.body.LastName ? req.body.LastName : "",
        Email: req.body.Email,
        AccountType: req.body.provider,
        ProfilePicture: req.body.photo ? req.body.photo : "",
        userId: req.body.userId,
        EntertainerRole: req.body.EntertainerRole,
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
              userRole: "entertainer",
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
              role: "entertainer",
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          return res.status(200).json({
            success: true,
            User: updateUserModel,
            Profile: newStudent,
            authtoken,
            msg: "entertainer profile creaed and user model updated successfully",
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
          role: "entertainer",
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

// FIND ALL SERVICES RELATED TO A SPECIFIC ENTERTAINER
router.post("/services", VerifyToken, async (req, res) => {
  try {
    const Food = await EntertainerServicesModel.find({
      EntertainerId: req?.user?.profileId,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, Services: Food });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Error in finding Services" });
  }
});

// ADD A NEW SERVICE
router.post(
  "/addservice",
  VerifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const FoodData = JSON.parse(req.body.Data);
      const EntertainerRole = JSON.parse(req.body.EntertainerRole);

      const Food = await EntertainerServicesModel.create({
        Title: FoodData?.Title,
        Description: FoodData?.Description,
        isActive: true,
        EntertainerId: req?.user?.profileId,
        Price: FoodData?.Price,
        Picture: req.file.path,
        EntertainerRole: EntertainerRole,
      });
      if (Food) {
        return res.status(200).json({
          success: true,
          msg: "Food Added Successfully",
          Service: Food,
        });
      } else {
        fs.unlinkSync(req.files.path);
        return res.status(400).json({ error: "Error in Creating Service" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: "Error in Adding Service",
      });
    }
  }
);

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

// FIND SINGLE Booking DETAIL RELATED TO A BOOKING
router.post("/bookings/:id", VerifyToken, async (req, res) => {
  try {
    const BookingId = req.params.id;
    const Booking = await BookingModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(BookingId),
          // HallManagerId: mongoose.Types.ObjectId(req?.user?.profileId),
        },
      },
      {
        $lookup: {
          from: "entertainer-services",
          localField: "HallId",
          foreignField: "_id",
          as: "Hall",
        },
      },
      {
        $lookup: {
          from: "allusers",
          localField: "userIid",
          foreignField: "_id",
          as: "User",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res.status(200).json({ success: true, Booking: Booking[0] });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Error in finding Bookings" });
  }
});
module.exports = router;
