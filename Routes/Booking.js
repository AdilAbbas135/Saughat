const express = require("express");
const VerifyToken = require("../Middlewear/VerifyToken");
const BookingModel = require("../Models/HallManager/Booking");
const router = express.Router();

router.post("/hall", VerifyToken, async (req, res) => {
  //   console.log(req.body.HallDetail);
  try {
    await BookingModel.create({
      FirstName: req?.body?.TutionData?.FirstName,
      LastName: req?.body?.TutionData?.LastName,
      Email: req?.body?.TutionData?.Email,
      Number: req?.body?.TutionData?.Number,
      Event: req?.body?.TutionData?.Event,
      Date: new Date(),
      Capacity: req?.body?.TutionData?.Capacity,
      Price: req?.body?.HallDetail?.Price,
      Description: req?.body?.TutionData?.Description,
      HallId: req?.body?.HallDetail._id,
      HallManagerId: req?.body?.HallDetail?.HallManagerId,
      userId: req?.user?.profileId,
    });
    return res.status(200).json({ msg: "Booking Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
