var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('docbai', { title: 'SM-TLCN' });
});

module.exports = router;
