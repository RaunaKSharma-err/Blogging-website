const express = require("express");
const multer = require("multer");
const router = express.Router();
const { handleBlogPost } = require("../controller/blog");
const Blog = require("../models/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("blogs");
});

router.get("/:id", async (req, res) => {
  const aboutBlog = await Blog.findById(req.params.id);
  res.render("viewMore", {
    aboutBlog,
    user: req.user,
  });
});

router.post("/", upload.single("thumbnail"), handleBlogPost);

module.exports = router;
