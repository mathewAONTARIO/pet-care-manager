// routes/index.js
// just the home page / splash

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Pet Care Manager' });
});

module.exports = router;