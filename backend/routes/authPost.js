const express = require('express');
const { createActivity, viewActivity, editActivity, viewMyActivities, joinActivity, deleteActivity, makeComment, deleteComment } = require('../controllers/authPostController');
const { verifyToken } = require('../middleware/auth');
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

//Activity APIs
router.post('/createActivity', verifyToken, createActivity);
router.delete('/deleteActivity/:id', verifyToken, deleteActivity);
router.get('/viewActivity', verifyToken, viewActivity);
router.put('/editActivity/:id', verifyToken, editActivity);
router.post('/viewMyActivities', verifyToken, viewMyActivities);
router.put('/joinActivity/:id', verifyToken, joinActivity);

//comment APIs
router.put('/makeComment/:id', verifyToken, makeComment);
router.delete('/deleteComment/:id/:comment_index', verifyToken, deleteComment);

module.exports = router;
