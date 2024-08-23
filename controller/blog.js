const Blog = require("../models/blog");
const Comment = require("../models/comment");

async function handleBlogPost(req, res) {
  const { title, description } = req.body;
  await Blog.create({
    title,
    description,
    thumbnailUrl: `uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  res.redirect("/");
}

async function handleViewMoreBlog(req, res) {
  const aboutBlog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  res.render("viewMore", {
    aboutBlog,
    user: req.user,
    comments,
  });
}

async function HandleBlogComment(req, res) {
  await Comment.create({
    comment: req.body.comment,
    blogId: req.params.id,
    createdBy: req.user._id,
  });
  res.redirect(`/blog/${req.params.id}`);
}

module.exports = { handleBlogPost, handleViewMoreBlog, HandleBlogComment };
