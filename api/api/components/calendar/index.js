const express = require('express');

const router = express.Router();

const { checkAuth } = require('../secure')
const controller = require('./controller')

// Internal functions
const SelectList = (req, res) => {
	controller.selectList()
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

const list = (req, res) => {
	controller.list(req.params.box, req.params.date)
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

const getCita = (req, res) => {
	controller.getCita(req.params.id)
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
router.get('/list',checkAuth(false), SelectList);
router.post('/', checkAuth(false), insert);
router.get('/:box/:date',checkAuth(false), list);
router.get('/:id',checkAuth(false), getCita);

module.exports = router;