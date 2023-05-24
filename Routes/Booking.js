const express = require("express");
const VerifyToken = require("../Middlewear/VerifyToken");
const BookingModel = require("../Models/HallManager/Booking");
const FoodBookingModel = require("../Models/FoodBooking");
const router = express.Router();

router.post("/hall", VerifyToken, async (req, res) => {
  console.log(req.body.EndingDate);
  try {
    await BookingModel.create({
      FirstName: req?.body?.TutionData?.FirstName,
      LastName: req?.body?.TutionData?.LastName,
      Email: req?.body?.TutionData?.Email,
      Number: req?.body?.TutionData?.Number,
      Event: req?.body?.TutionData?.Event,
      Date: new Date(req.body.EndingDate),
      Capacity: req?.body?.TutionData?.Capacity,
      Price: req?.body?.HallDetail?.Price,
      Description: req?.body?.TutionData?.Description,
      HallId: req?.body?.HallDetail._id,
      HallManagerId: req?.body?.HallDetail?.HallManagerId,
      userId: req?.user?.profileId,
      SelectedStage: req.body?.SelectedStage,
    });
    return res.status(200).json({ msg: "Booking Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/food", VerifyToken, async (req, res) => {
  // console.log(req.body.HallDetail);
  // console.log(req.body.TutionData);
  try {
    await FoodBookingModel.create({
      FirstName: req?.body?.TutionData?.FirstName,
      LastName: req?.body?.TutionData?.LastName,
      Email: req?.body?.TutionData?.Email,
      Number: req?.body?.TutionData?.Number,
      Event: req?.body?.TutionData?.Event,
      Date: new Date(req.body?.EndingDate),
      Price: req?.body?.HallDetail?.Price,
      Description: req?.body?.TutionData?.Description,
      FoodId: req?.body?.HallDetail._id,
      HallManagerId: req?.body?.HallDetail?.HallManagerId,
      userId: req?.user?.profileId,
    });
    return res.status(200).json({ msg: "Booking Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/photographer", VerifyToken, async (req, res) => {
  // console.log(req?.body?.HallDetail);
  try {
    await BookingModel.create({
      FirstName: req?.body?.TutionData?.FirstName,
      LastName: req?.body?.TutionData?.LastName,
      Email: req?.body?.TutionData?.Email,
      Number: req?.body?.TutionData?.Number,
      Event: req?.body?.TutionData?.Event,
      Date: new Date(req.body.EndingDate),
      Price: req?.body?.HallDetail?.Price,
      Description: req?.body?.TutionData?.Description,
      HallId: req?.body?.HallDetail._id,
      HallManagerId: req?.body?.HallDetail?.EntertainerId,
      userId: req?.user?.profileId,
      Capacity: 0,
    });
    return res.status(200).json({ msg: "Booking Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
