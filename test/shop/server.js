const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/** */
/** */
/** HIDE SECRETS */
const JWT_SECRET = "000";

//Connect to MongoDB
mongoose
  .connect("000", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));
/** HIDE SECRETS */
/** */
/** */

//Express server
const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

//
app.post("/api/change-password", async (req, res) => {
  const { token, newPassword: plainTextPassword } = req.body;

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 8) {
    return res.json({
      status: "error",
      error: "Password must be at least 8 characters",
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const id = user.id;
    const password = await bcrypt.hash(plainTextPassword, 10);

    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.json({ status: "OK" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: ";))" });
  }
});

//
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/ password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    //login was successful
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );

    return res.json({ status: "OK", data: token });
  }

  res.json({ status: "error", error: "Invalid username/ password" });
});

//
app.post("/api/register", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 8) {
    return res.json({
      status: "error",
      error: "Password must be at least 8 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      //duplicate key
      return res.json({ status: "error", error: "Username already exists" });
    }
    throw error;
  }

  res.json({ status: "OK" });
});

//Allow access to public files (stylesheets, scripts, and images)
app.use("/public", express.static(__dirname + "/public"));

//Run Express on port 3000
app.listen(3000, () => {
  console.log("Success: server is running at port 3000");
});
