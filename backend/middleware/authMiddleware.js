const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const token = authHeader.split(" ")[1]; // 🔥 IMPORTANT LINE

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};