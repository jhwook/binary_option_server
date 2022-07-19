const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    jwt.verify(
      `${req.headers.authorization}`,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          throw err;
        }
        req.decoded = decoded;
        return next();
      }
    );
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: 'Token Expired.',
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: 'Token Invalid.',
      });
    }
  }
};

exports.softauth = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    req.decoded = false;
    return next();
  }
};
