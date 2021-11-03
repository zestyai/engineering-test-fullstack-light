var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.js');
/* GET home page. */
router.get('/', indexController.getIndex);
router.get('/properties', indexController.getAllProps);

module.exports = router;
