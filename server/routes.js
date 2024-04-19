const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { users } = require("./model.js"); 
const { admins } = require("./model.js")
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

router.get("/getuser", verifyToken, async (req, res) => {
  try {
    const data = await users.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({ name, email, password: hashedPassword });
    console.log(newUser);
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      jwtSecret,
      { expiresIn: "1h" }
    );
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    console.log("password not matching")
    return res.status(402).json({ error: "Incorrect password" });
  }
  else {
    try {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        jwtSecret,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(501).json({ error: error.message || "Internal server error" });
    }
  }
});
router.get("/getadmin", verifyToken, async (req, res) => {
  try {
    const data = await admins.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/adminlogin", async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  const admin = await admins.findOne({ adminEmail: adminEmail });
  if (!admin) {
    return res.status(401).json({ error: "Admin not found" });
  }
  if (adminPassword != admin.adminPassword) {
    console.log("password not matching")
    return res.status(402).json({ error: "Incorrect password" });
  }
  else {
    try {
      const token = jwt.sign(
        { adminId: admin._id, email: admin.adminEmail },
        jwtSecret,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(501).json({ error: error.message || "Internal server error" });
    }
  }
});

module.exports = router;
