const { Op } = require('sequelize');
const User = require("../models/user.model");

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

module.exports = {
  signup,
};
