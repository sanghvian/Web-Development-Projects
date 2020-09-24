const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function () {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. Token not found');
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.send(400) / send('Invalid Token....');
  }
};
