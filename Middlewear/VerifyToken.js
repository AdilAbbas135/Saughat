var jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  // GET USER FROM TOKEN AND GET ID OF THE USER AND SHOW HIS DATA
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "access denied" });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = data;
      next();
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: "Session Expired Login Again" });
    }
  }
};
module.exports = VerifyToken;
