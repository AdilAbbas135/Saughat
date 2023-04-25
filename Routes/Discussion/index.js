const express = require("express");
const VerifyToken = require("../../Middlewear/VerifyToken");
const DiscussionModel = require("../../Models/Discussion");
const { default: mongoose } = require("mongoose");
const DiscussionReplyModel = require("../../Models/Discussion/Replies");
const router = express.Router();

//  ROUTE 1: FETCH ALL DISCUSSIONS FOR THE DISCUSSION PAGE
//  ROUTE 2: FETCH ALL DISCUSSIONS POSTED BY A SPECIFIC USER
//  ROUTE 3: UPLOAD A DISCUSSION AGAINST A SPECIFIC USER
//  ROUTE 4: Get All the Replies Posted Against a SPECIFIC Discussion
//  ROUTE 5: Post a Reply Against a SPECIFIC Discussion

// ROUTE 1: FETCH ALL DISCUSSIONS FOR THE DISCUSSION PAGE
router.get("/", async (req, res) => {
  try {
    const discussions = await DiscussionModel.aggregate([
      {
        $match: {
          Status: true,
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "userId",
          foreignField: "_id",
          as: "Student",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res.status(200).json(discussions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//  ROUTE 2: FETCH ALL DISCUSSIONS POSTED BY A SPECIFIC USER
router.post("/", VerifyToken, async (req, res) => {
  try {
    const discussions = await DiscussionModel.find({
      userId: mongoose.Types.ObjectId(req.user.profileId),
    }).sort({ createdAt: -1 });
    return res.status(200).json(discussions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//  ROUTE 3: UPLOAD A DISCUSSION AGAINST A SPECIFIC USER
router.post("/create-discussion", VerifyToken, async (req, res) => {
  console.log(req.user);
  console.log(req.body);
  try {
    const discussion = await DiscussionModel.create({
      Title: req.body.Title,
      Description: req.body.Description,
      Status: req.body.Status === "active" ? true : false,
      userId: req.user.profileId,
    });
    return res.status(200).json(discussion);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//  ROUTE 4: Get All the Replies Posted Against a SPECIFIC Discussion
router.post("/get-replies", async (req, res) => {
  const DiscussionId = req.query.DiscussionId;
  try {
    const Discussion = await DiscussionModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(DiscussionId),
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "userId",
          foreignField: "_id",
          as: "Student",
        },
      },
    ]);
    const Answers = await DiscussionReplyModel.aggregate([
      {
        $match: {
          DiscussionId: mongoose.Types.ObjectId(DiscussionId),
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "userId",
          foreignField: "_id",
          as: "TeacherProfile",
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "userId",
          foreignField: "_id",
          as: "StudentProfile",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    return res
      .status(200)
      .json({ Discussion: Discussion[0], Answers: Answers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error! Try Again Later" });
  }
});

//  ROUTE 5: Post a Reply Against a SPECIFIC Discussion
router.post("/post-reply", VerifyToken, async (req, res) => {
  const DiscussionId = req.query.DiscussionId;
  try {
    const reply = await DiscussionReplyModel.create({
      DiscussionId: DiscussionId,
      Answer: req.body.Answer,
      userId: req.user.profileId,
    });
    return res.status(200).json({ success: true, msg: "Reply Posted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
