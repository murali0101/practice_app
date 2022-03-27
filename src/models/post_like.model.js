const mongoose = require("mongoose");

const postLikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const PostLike = mongoose.model("post_like", postLikeSchema);
module.exports = PostLike;

// - PostLike Model
// - postId ( references post collection)
// - userId ( references user collection)
