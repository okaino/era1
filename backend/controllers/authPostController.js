const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken, generateRefreshToken } = require('../utils/token');
const mongodb = require('../mongodb');
const Post = require('../models/post.js')

const createActivity = async (req, res) => {
  try {
    const { content } = req.body;
    const user_id = req.user["user_id"]
    const user_name = req.user["user_name"]
    const newPost = new Post({
      user_id: user_id,
      user_name: user_name,
      content: content,
      attendees_id: [],
      attendees_name: [],
      comments: []
    });

    await newPost.save().then(() => {
      res.status(201).send({ message: "Post created successfully", post: newPost });
    });

  } catch (error) {
    res.status(500).send({ message: "Error creating post", error: error.message });
  }
};
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting post", error: error.message });
  }
}
const editActivity = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { content: content } },
      { new: true } // Returns the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error });
  }
}
const viewMyActivities = async (req, res) => {
  const user_id = req.user["user_id"]

  try {
    const posts = await Post.find({ user_id: user_id });
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error });
  }

}
const viewActivity = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
}
const joinActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const attendees_id = req.user["user_id"]
    const attendees_name = req.user["user_name"]
    const activity = await Post.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    if (!activity.attendees_id.includes(attendees_id)) {
      attendees_id ? activity.attendees_id.push(attendees_id) : null
      attendees_name ? activity.attendees_name.push(attendees_name) : null
      await activity.save();
      return res.status(200).json({ message: 'User added to activity', activity });
    } else {
      return res.status(400).json({ error: 'User already part of the activity' });
    }
  } catch (error) {
    console.error('Error joining activity:', error);
    return res.status(500).json({ message: 'An error occurred while joining the activity' });
  }
}

const makeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentor_name = req.user["user_name"]
    const commentor_id = req.user["user_id"]

    const comment_content = req.body.comment_content

    const comment_data = {
      user_id: commentor_id,
      user_name: commentor_name,
      comment_content: comment_content
    }

    const activity = await Post.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' })
    }
    activity.comments.push(JSON.stringify(comment_data))
    await activity.save();
    return res.status(200).json({ message: 'Commented!', activity });
  } catch (error) {
    console.error('Error joining activity:', error);
    return res.status(500).json({ error: 'An error occurred while commenting the activity' });
  }

}

const deleteComment = async (req, res) => {

  try {
    const { id, comment_index } = req.params
    const activity = await Post.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' })
    }
    let arr = activity.comments.splice(comment_index-1, 1)
    console.log(arr)
    return res.status(200).json({ message: 'Comment deleted', activity });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while deleting comment' });
  }

}

const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token with the same user information
    const newAccessToken = generateToken({ email: user.email });
    res.json({ accessToken: newAccessToken });
  });
};


module.exports = { createActivity, refreshToken, viewActivity, editActivity, viewMyActivities, joinActivity, deleteActivity, makeComment, deleteComment };
