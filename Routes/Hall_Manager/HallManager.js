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
      const student = await HallsManagerModel.findOne({
        _id: req.user?.profileId,
        userId: req.user?.userId,
      });
      if (student) {
        return res.status(200).json({ Success: true, HallManager: student });
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
// CREATE Hall Manager PROFILE ACCOUNT
router.post("/createprofile", async (req, res) => {
  // console.log(req.body);
  const student = await HallsManagerModel.findOne({ Email: req.body.Email });
  if (!student) {
    const newStudent = await HallsManagerModel.create({
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
            userRole: "hall-manager",
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
            role: "hall-manager",
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          success: true,
          User: updateUserModel,
          Profile: newStudent,
          authtoken,
          msg: "Hall Manager profile creaed and user model updated successfully",
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
        role: "hall-manager",
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
});

// FIND ALL HALLS RELATED TO A SPECIFIC HALL MANAGER
router.post("/halls", VerifyToken, async (req, res) => {
  try {
    const halls = await HallModel.find({
      HallManagerId: req?.user?.profileId,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, Halls: halls });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Error in finding Halls" });
  }
});

// ADD A NEW Hall
router.post(
  "/addHall",
  VerifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const TutionData = JSON.parse(req.body.Data);
      const tution = await HallModel.create({
        Title: TutionData?.Title,
        Description: TutionData?.Description,
        isActive: true,
        HallManagerId: req?.user?.profileId,
        Price: TutionData?.Price,
        Picture: req.file.path,
        Capacity: TutionData?.Capacity,
      });
      if (tution) {
        return res.status(200).json({
          success: true,
          msg: "Hall Added Successfully",
          Hall: tution,
        });
      } else {
        fs.unlinkSync(req.files.path);
        return res.status(400).json({ error: "Error in Creating Service" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: "Error in Adding Hall",
      });
    }
  }
);

// FIND ALL FOODS RELATED TO A SPECIFIC HALL MANAGER
router.post("/food", VerifyToken, async (req, res) => {
  try {
    const Food = await FoodModel.find({
      HallManagerId: req?.user?.profileId,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, Food });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Error in finding Foods" });
  }
});

// ADD A NEW FOOD
router.post(
  "/addFood",
  VerifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const FoodData = JSON.parse(req.body.Data);
      const Items = JSON.parse(req.body?.Items);

      const Food = await FoodModel.create({
        Title: FoodData?.Title,
        Description: FoodData?.Description,
        isActive: true,
        HallManagerId: req?.user?.profileId,
        Price: FoodData?.Price,
        Picture: req.file.path,
        Items: Object.keys(Items),
      });
      if (Food) {
        return res.status(200).json({
          success: true,
          msg: "Food Added Successfully",
          Food,
        });
      } else {
        fs.unlinkSync(req.files.path);
        return res.status(400).json({ error: "Error in Creating Service" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: "Error in Adding Food",
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
          HallManagerId: mongoose.Types.ObjectId(req?.user?.profileId),
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
          HallManagerId: mongoose.Types.ObjectId(req?.user?.profileId),
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
          from: "halls",
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

// FIND SINGLE Food Booking DETAIL RELATED TO A BOOKING
router.post("/food-bookings/:id", VerifyToken, async (req, res) => {
  try {
    const BookingId = req.params.id;
    const Booking = await FoodBookingModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(BookingId),
          // HallManagerId: mongoose.Types.ObjectId(req?.user?.profileId),
        },
      },
      {
        $lookup: {
          from: "foods",
          localField: "FoodId",
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

// FIND SINGLE Booking DETAIL RELATED TO A BOOKING and update its status from pending to ter available options
router.post("/bookings/:id/update", VerifyToken, async (req, res) => {
  try {
    console.log(req.body);
    const BookingId = req.params.id;
    await BookingModel.findByIdAndUpdate(
      BookingId,
      {
        $set: { Status: req.body?.Status },
      },
      { upsert: true }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Status has been Updated" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Error in finding Bookings" });
  }
});

// FIND SINGLE Food Booking DETAIL RELATED TO A BOOKING and update its status from pending to ter available options
router.post("/food-bookings/:id/update", VerifyToken, async (req, res) => {
  try {
    console.log(req.body);
    const BookingId = req.params.id;
    await FoodBookingModel.findByIdAndUpdate(
      BookingId,
      {
        $set: { Status: req.body?.Status },
      },
      { upsert: true }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Status has been Updated" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Error in finding Bookings" });
  }
});

module.exports = router;
