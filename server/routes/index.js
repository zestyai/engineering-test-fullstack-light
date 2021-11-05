var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.js');
/* GET home page. */
router.get('/', indexController.getIndex);
router.get('/properties', indexController.getAllProps);
router.get('/display/:id', indexController.display);
router.post('/property/:pid', indexController.oneProperty);
router.post('/find', indexController.findProperty);

module.exports = router;
