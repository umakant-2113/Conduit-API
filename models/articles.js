const mongoose = require("mongoose");
const User = require("../models/users");
const Schema = mongoose.Schema;
let helperMethods = require("../helpers/formatdata");
let randomNumber = helperMethods.randomNumber;
let articleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    description: { type: String, required: true },
    body: { type: String, required: true },
    taglist: [{ type: String }],
    likes: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "BlogUser" },
    comments: [{ type: Schema.Types.ObjectId, ref: "BlogComment" }],
    favouritedCount: { type: Number, default: 0 },
    favouriteList: [{ type: Schema.Types.ObjectId, ref: "BlogUser" }],
  },
  { timestamps: true }
);

// to assign  slug to article document
articleSchema.pre("save", function (next) {
  this.slug = this.title + "_" + randomNumber();
  this.slug = this.slug.split(",").join("-");
  next();
});


let Article = mongoose.model("BlogArticle", articleSchema);
module.exports = Article;
