const express = require('express');
const { registerUser, loginUser, logoutUser, refreshToken } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logoutUser);
router.post('/token', refreshToken);

module.exports = router;
