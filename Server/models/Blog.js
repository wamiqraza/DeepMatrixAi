const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  coverImage: String,
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', BlogSchema);