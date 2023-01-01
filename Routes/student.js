const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).json({ sucess: true });
});

module.exports = router;
