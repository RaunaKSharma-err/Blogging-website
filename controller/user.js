const User = require("../models/user");

async function HandleSingUp(req, res) {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) return res.end("all feilds required");
  await User.create({
    fullName,
    email,
    password,
  });
  res.redirect("/signin");
}

async function HandleSingIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.end("all feilds required");
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token).redirect("/");
  } catch (err) {
    res.render("signIn", {
      error: "Incorrect email or password",
    });
  }
}

module.exports = { HandleSingUp, HandleSingIn };
