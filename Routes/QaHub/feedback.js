const express = require("express");
const RatingModal = require("../../Models/Teacher/Rating");
const router = express.Router();

router.post("/create", async (req, res) => {
  // console.log(req.body);
  try {
    await RatingModal.create({
      communication: req.body.communication,
      SolvedProblem: req.body.SolvedProblem,
      WayOfTeaching: req.body.WayOfTeaching,
      Feedback: req.body.Feedback,
      StudentId: req.body.StudentId,
      TeacherId: req.body.TeacherId,
    });
    return res
      .status(200)
      .json({ msg: "Feedback Added to the Teacher Profile" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
