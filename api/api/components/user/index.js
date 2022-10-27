const express = require('express');

const router = express.Router();

const { checkAdmin } = require('../secure')
const controller = require('./controller')

// Internal functions
const list = (req, res) => {
	controller.list()
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

// Internal functions
const insert = (req, res) => {
	controller.insert(req.body)
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

const erase = (req, res) => {
	controller.erase(req.params.id)
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
router.get('/', checkAdmin(), list);
router.post('/', checkAdmin(), insert);
router.delete('/:id', checkAdmin(), erase)

module.exports = router;