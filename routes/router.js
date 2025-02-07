const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const clubsModel = require("../models/clubsModel.js");
const playersModel = require("../models/playersModel.js");
const managersModel = require("../models/managersModel.js");
const userModel = require("../models/usersModel.js");

const app = express();
app.use(express.json());

require("dotenv").config();

//user register
router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.mail) {
      return res.status(400).send({ message: "Enter valid mail address" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userData.password, salt);
    userData.password = hashed;
    const userLogin = await userModel.create(userData);
    return res.status(201).send({ message: "User registered" });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const existedUser = await userModel.findOne({ mail: userData.mail });
    if (existedUser !== null) {
      await bcrypt.compare(
        userData.password,
        existedUser.password,
        async (err, validPass) => {
          if (validPass) {
            // console.log(validPass);
            await jwt.sign(
              { existedUser },
              process.env.JWT_CLIENT,
              (err, token) => {
                if (!err) {
                  return res
                    .status(200)
                    .send({ message: "Login successfull", token: token });
                } else {
                  return res
                    .status(400)
                    .send({ message: "Something wrong try again" });
                }
              }
            );
          } else {
            return res.status(400).send({ message: "Wrong password" });
          }
        }
      );
    } else {
      return res.status(400).send({ message: "Check your mail ID" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Some error try again", err });
  }
});

//fetching all players
router.get("/players",  async (req, res) => {
  try {
    const players = await playersModel.find({});

    return res.status(200).send({ players });
  } catch (err) {
    return res.status(500).send({ message: "Some error try again", err });
  }
});

//fetching player with name
router.get("/players/:name",  async (req, res) => {
  try {
    const players = await playersModel.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    console.log(players);

    return res.status(200).send({ players });
  } catch (err) {
    return res.status(500).send({ message: "Some error try again", err });
  }
});

//fetching all clubs
router.get("/clubs", async (req, res) => {
  try {
    const clubs = await clubsModel.find({});

    return res.status(200).send({ clubs });
  } catch (err) {
    return res.status(500).send({ message: "Some error try again", err });
  }
});

//fetching clubs with name

router.get("/clubs/:name", verifyToken, async (req, res) => {
  try {
    const clubs = await clubsModel.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    return res.status(200).send({ clubs });
  } catch (err) {
    return res.status(500).send({ message: "Some error try again", err });
  }
});

//fetching all managers
router.get("/managers",  async (req, res) => {
  try {
    const managers = await managersModel.find({});

    return res.status(200).send({ managers });
  } catch (err) {
    return res.status(500).send({ message: "Some error try again", err });
  }
});

//fetching managers with name

router.get("/managers/:name", verifyToken, async (req, res) => {
  try {
    const managers = await managersModel.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    return res.status(200).send({ managers });
  } catch (err) {
    return res.status(500).send({ message: "Some error try again", err });
  }
});

//verify token

async function verifyToken(req, res, next) {
  const token = await req.headers.authorization.split(" ")[1];
  await jwt.verify(token, process.env.JWT_CLIENT, (err, data) => {
    if (!err) {
      // console.log(data);
      next();
    } else {
      return res.status(400).send({ message: "Invalid token" });
    }
  });
}

module.exports = router;
