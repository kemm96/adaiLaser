const jwt = require('jsonwebtoken');

const config = require('../config');

const secret = config.jwt.secret;

const sign = (data) => {
   const token = {
      user: data,
   }

   return jwt.sign(token, secret);
}

module.exports = {
   sign,
};