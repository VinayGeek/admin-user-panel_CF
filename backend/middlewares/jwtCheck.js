const JWT = require("jsonwebtoken");
const JWT_Secret = "vinaysecretkey";

exports.generateToken = (payload = {}) => {
  return JWT.sign(payload, JWT_Secret);
};

exports.verifyToken = (req, res, next) => {
  const userData = JWT.verify(req.headers.token, JWT_Secret);
  req.user = userData._id;
  next()
};
