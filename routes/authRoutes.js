const express = require('express');
const router = express.Router();
const { signup, login, verifyEmail } = require('../controller/auth_controller');

router.post('/signup', signup);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);

module.exports = router;
