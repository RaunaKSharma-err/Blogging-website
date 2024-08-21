const express = require("express");
const router = express.Router();
const { HandleSingUp, HandleSingIn } = require("../controller/user");
const blogs = require("../models/blog");

router.get("/", async (req, res) => {
  const allBlogs = await blogs.find({});
  return res.render("home", {
    user: req.user,
    blog: allBlogs,
  });
});
router.get("/signup", (req, res) => {
  return res.render("signUp");
});
router.get("/signin", (req, res) => {
  return res.render("signIn");
});
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", HandleSingUp);
router.post("/signin", HandleSingIn);

module.exports = router;
