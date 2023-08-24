const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, secretKey);
  } catch (e) {
    return res.send({ message: e.message });
  }
  req.user = payload;
  next();
};
