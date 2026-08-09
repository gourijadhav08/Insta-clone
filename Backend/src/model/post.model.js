const mongoose = require("mongoose")

const NewPost = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "Have to add username"],
    },
  },
  { timestamps: true }
)

const PostModel = mongoose.model("NewPost", NewPost)

module.exports = PostModel