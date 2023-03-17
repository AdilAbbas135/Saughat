const express = require("express");
const router = express.Router();
const VerifyToken = require("../../Middlewear/VerifyToken");
const VerifyTeacher = require("../../Middlewear/VerifyTeacher");
const TutionModel = require("../../Models/Teacher/Tution");

// ROUTE 1: FIND ALL TUTIONS AGAINT A TEACHER
router.post("/", VerifyToken, VerifyTeacher, async (req, res) => {
  try {
    const tutions = await TutionModel.find({
      TeacherId: req?.user?.profileId,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, tutions });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Error in finding the tutio services" });
  }
});

// ROUTE 2: ADD A NEW TUTION SERVICE
router.post("/addTution", VerifyToken, VerifyTeacher, async (req, res) => {
  try {
    const tution = await TutionModel.create({
      Title: req.body.TutionData?.Title,
      Description: req.body?.TutionData?.Description,
      isActive: true,
      TeacherId: req?.user?.profileId,
      Subjects: req?.body?.AllSubjects,
      Fee: req.body?.TutionData?.Fees,
    });
    return res.status(200).json({
      success: true,
      msg: "Tution Service Added Successfully",
      tution,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: "Error in Adding the Tution Service",
    });
  }
});

// ROUTE 3: DELETE A TUTION SERVICE
router.post("/deleteTution/:id", VerifyToken, async (req, res) => {
  const tution = await TutionModel.findById(req.params.id);
  if (tution.TeacherId.toHexString() === req.user.profileId) {
    await tution.delete();
    return res
      .status(200)
      .json({ success: true, msg: "Tution Sercvice Deleted Successfully" });
  } else {
    return res.status(400).json({
      success: false,
      error: "You are Not Allowed to delete this Service",
    });
  }
});

module.exports = router;
