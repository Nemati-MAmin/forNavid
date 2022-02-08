const jwt = require("jsonwebtoken");
const { body } = require('express-validator');
const secret = 'secret-key'

exports.credentialValidator = body('email').isEmail().normalizeEmail().withMessage({
  message: 'Email error',
}), body('password').isLength({ min: 12 }).matches(/\d/).withMessage({
  message: 'Password error',
})


exports.jwtValidator = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err)
        res.status(403).json(err);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};