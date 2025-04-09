const { Op } = require("sequelize");
const User = require("../models/user.model");
const { verifyPassword } = require("../middlewares/auth");
const { generateAccessToken } = require("../middlewares/jwt");
const moment = require("moment");

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already in use." });
    }

    const newUser = await User.create({ username, email, password });

    const userData = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      message: "User created successfully.",
      user: userData,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function signin(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid username/email or password." });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid username/email or password." });
    }

    const tokenObj = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = await generateAccessToken(tokenObj, "24h");
    
    const parsedDateTime = moment().add(24, 'hours');
    const timestamp = parsedDateTime.valueOf();

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      token: token,
      tokenExpiry: timestamp,
    };

    res.status(200).json({ message: "Login successful.", user: userData });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  signup,
  signin,
};
