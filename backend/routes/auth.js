const express = require('express');
const { registerUser, loginUser, logoutUser, refreshToken } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const dotenv = require('dotenv');
const router = express.Router();

const cors = require('cors')

dotenv.config();

router.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL
    })
)

//User APIs
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/logout', authenticateToken, logoutUser);
router.post('/token', refreshToken);

module.exports = router;
