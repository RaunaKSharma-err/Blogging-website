const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  handleBlogPost,
  handleViewMoreBlog,
  HandleBlogComment,
} = require("../controller/blog");

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

router.get("/:id", handleViewMoreBlog);

router.post("/comment/:id", HandleBlogComment);

router.post("/", upload.single("thumbnail"), handleBlogPost);

module.exports = router;
