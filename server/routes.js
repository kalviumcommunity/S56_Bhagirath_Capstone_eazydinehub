const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { users } = require("./model.js"); 
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

router.get("/getuser",async (req,res)=>{
    const data = await users.find({});
    res.json(data);
})

router.post("/signup", async (req, res) => {
  const { name,email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new users({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
        { userId: newUser._id, email: newUser.email, password: hashedPassword },
        jwtSecret,
        { expiresIn: "1h" } 
      );
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
