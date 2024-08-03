const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  userModel.findUserByUsername(username, (err, results) => {
    if (err) {
      console.error("Error checking username:", err);
      return res.status(500).json({ error: err });
    }

    // If the username is found, return a 400 status with a message
    if (results.length > 0) {
      return res.status(400).json({ message: "Username already taken" });
    }

    userModel.findUserByEmail(email, (err, emailresults) => {
      if (emailresults?.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }
    });

    // Proceed with password hashing and user creation
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: err });
      }
      userModel.createUser(username, email, hash, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "User registered" });
      });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  userModel.findUserByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ error: err });
      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    });
  });
};
