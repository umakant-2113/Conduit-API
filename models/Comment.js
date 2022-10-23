const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "BlogUser" },
    articleId: { type: Schema.Types.ObjectId, ref: "BlogArticle" },
  },
  { timestamps: true }
);
let Comment = mongoose.model("BlogComment", commentSchema);

module.exports = Comment;