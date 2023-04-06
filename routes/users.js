var express = require('express');
const { createAccount, readAccount, searchAccount, updateAccount, deleteAccount, findNearUsers } = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/add', createAccount);
router.get('/read', readAccount);
router.get('/search', searchAccount);
router.put('/edit/:id', updateAccount);
router.delete('/edit/:id', deleteAccount);

module.exports = router;
