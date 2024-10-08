require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");

connectMongoDB(
  "mongodb+srv://Blogee:progritik1228@blogee.qlvbadv.mongodb.net/?retryWrites=true&w=majority&appName=Blogee"
).then((e) => console.log("MongoDB connected"));

const userRoutes = require("./routes/user");
const blogRouter = require("./routes/blogs");
const { checkForAuthenticatedUser } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticatedUser("token"));
app.use(express.static(path.resolve("./public")));

app.use("/", userRoutes);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
