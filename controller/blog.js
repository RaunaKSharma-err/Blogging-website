const Blog = require("../models/blog");

async function handleBlogPost(req, res) {
  const { title, description } = req.body;
  const blog = await Blog.create({
    title,
    description,
    thumbnailUrl: `uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  res.redirect("/",);
}

module.exports = { handleBlogPost };
