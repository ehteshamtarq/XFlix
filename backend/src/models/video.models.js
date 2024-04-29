const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  videoLink: {
    type: String,
    required: true,
    trim: true,
  },
  contentRating: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: String,
    required: true,
    trim: true,
  },
  previewImage: {
    type: String,
    required: true,
    trim: true,
  },
  viewCount: {
    type: Number,
    required: false,
    default: 0,
  },
  votes: {
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
  },
});

module.exports.Video = mongoose.model("Videos", videoSchema);