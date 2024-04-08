const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { users } = require("./model.js"); 

router.post("/signup", async (req, res) => {
  const { name,email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new users({ email, password });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      "secretr_key",
      { expiresIn: "1h" } 
    );
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
