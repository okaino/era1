const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attendees_id: {
    type: [Number],
    required: false,
    default: [] 
  },
  attendees_name: {
    type: [String],
    required: false,
    default: [] 
  },
  comments: {
    type: [String],
    required: false
  },
  
})

module.exports = mongoose.model('posts', postSchema);

