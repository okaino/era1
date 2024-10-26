const express = require('express');
const { createActivity, viewActivity, editActivity, viewMyActivities, joinActivity, deleteActivity, makeComment, deleteComment } = require('../controllers/authPostController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post('/createActivity', verifyToken, createActivity);
router.delete('/deleteActivity/:id', verifyToken, deleteActivity);
router.get('/viewActivity', verifyToken, viewActivity);
router.put('/editActivity/:id', verifyToken, editActivity);
router.post('/viewMyActivities', verifyToken, viewMyActivities);
router.put('/joinActivity/:id', verifyToken, joinActivity);
router.put('/makeComment/:id', verifyToken, makeComment);
router.delete('/deleteComment/:id/:comment_index', verifyToken, deleteComment);

module.exports = router;
