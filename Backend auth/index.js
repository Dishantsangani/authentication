const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./Models/Model");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/dishant");

// API

const varifyUser = (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    return res.json("Token Is Missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("error with token");
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.json("Not admin");
        }
      }
    });
  }
};
app.get("/dashboard", varifyUser, (req, res) => {
  res.json("Success");
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ username, email, password: hash })
        .then((user) => res.json("Success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ status: "Success", role: user.role });
        } else {
          return res.json("Password is incorrect");
        }
      });
    } else {
      return res.json("No Record Existed");
    }
  });
});

// PORT
app.listen(2700, () => console.log("Server is Started"));
