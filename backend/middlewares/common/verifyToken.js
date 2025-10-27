const jwt = require("jsonwebtoken");
const { createError } = require("./errorHandler");

function verifyToken(role) {
  return function (req, res, next) {
    const token = req.cookies.msToken;

    if (!token) {
      next(createError("Invalid!", 401));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw createError("Invalid!", 401);
      if (role && decoded.username !== role) {
        next(createError("Invalid!", 401));
      }
      req.user = decoded;
      next();
    });
  };
}

module.exports = verifyToken;
