const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/userController');
const {check} = require('express-validator');
// Register route
router.post('/signup',signup);

// Login route
router.post('/login', login);

module.exports = router;
