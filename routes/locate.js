var express = require('express');
const { findNearUsers } = require('../controllers/userController');
var router = express.Router();

router.get('/locate', findNearUsers);

module.exports = router;
