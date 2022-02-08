const { validationResult } = require('express-validator');

exports.login = (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    }
   return next()
}