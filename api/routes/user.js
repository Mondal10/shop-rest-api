const express = require('express');
const router = express.Router();

const authentication = require('../middleware/authentication');
const { getAllUsers, userSignup, userLogin, deleteUser } = require('../controllers/user');

router.get('/all', authentication, getAllUsers);

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.delete('/:userId', authentication, deleteUser);

module.exports = router;