const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");

const app = express();

// use cookie
app.use(cookieParser());

//use express.json() to get data into json format
app.use(express.json());
//Port
const PORT = process.env.PORT || 3000;

//use cors
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//import routes
const TodoItemRoute = require("./routes/todoItems");
const UserModel = require("./models/User");

//connect to mongodb ..
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);

// Implemented user registeration api
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)

    .then((hash) => {
      UserModel.create({ name, email, password: hash })

        .then((user) => res.json({ status: "OK" }))

        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

// Implemented user registeration api

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          // Added JWT
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secrete-token",
            { expiresIn: "1day" }
          );

          // Added cookies
          res.cookie("token", token);
          return res.json("success");
        } else return res.json("The Password is Incorrect");
      });
    } else {
      return res.json("No record existed");
    }
  });
});
//connect to server
app.listen(PORT, () => console.log("Server connected"));
