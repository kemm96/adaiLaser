const express = require('express');

const router = express.Router();

const controller = require('./controller')

// Internal functions
const login = (req, res) => {
	controller.login(req.body)
   .then((body) => {
      res.send({
         error: false,
         body: body
      })
   })
   .catch((err) => {
      res.send({
         error: true,
         body: err.message,
      })
   });
}

// Routes
router.post('/', login);

module.exports = router;