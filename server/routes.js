const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const moment = require("moment")
require('dotenv').config();

const { users, admins, dishes, chefs, orders, completedorders } = require("./model.js");

const router = express.Router();
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
router.get("/users", async (req, res) => {
  try {
    const allusers = await users.find({});
    res.json(allusers);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details. Please try again later.' });
  }
});

router.get("/getadmin", verifyToken, async (req, res) => {
  try {
    const data = await admins.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/adminlogin", async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  const admin = await admins.findOne({ adminEmail: adminEmail });
  if(!admin){
    return res.status(401).json({error:"Admin not found"})
  }
  const adminPasswordMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
  if (!adminPasswordMatch) {
    console.error("password not matching")
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
router.post("/createadmin", async (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;

  try {
    const existingAdmin = await admins.findOne({ adminEmail: adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }
    
    let hashedAdminPassword;
    try {
      hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return res.status(500).json({ error: "Error hashing password" });
    }

    const newAdmin = await admins.create({ adminName, adminEmail, adminPassword: hashedAdminPassword });
    const token = jwt.sign(
      { adminId: newAdmin._id, adminEmail: newAdmin.adminEmail },
      jwtSecret,
      { expiresIn: "1h" }
    );
    res.status(201).json({ message: "Admin created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  } 
});
router.post("/create-dishes", async (req, res) => {
  const { dishName, dishCategory, dishLink, dishPrice } = req.body;
  try {
    const newDish = await dishes.create({ dishName, dishCategory, dishLink, dishPrice });
    res.status(201).json({ message: "Dish created successfully", newDish });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/dishes/softdrinks', async (req, res) => {
  try {
    const softdrinksDishes = await dishes.find({ dishCategory: 'Soft Drinks' });
    res.json(softdrinksDishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/dishes/burgers', async (req, res) => {
  try {
    const burgers = await dishes.find({ dishCategory: 'Burger' });
    res.json(burgers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/dishes/pizzas', async (req, res) => {
  try {
    const pizzas = await dishes.find({ dishCategory: 'Pizza' });
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/delete/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const deletedSoftDrink = await dishes.findByIdAndDelete(id);

    if (!deletedSoftDrink) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    console.error('Error deleting Dish:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.put('/updatedish/:_id', async (req, res) => {
  const { _id: dishId } = req.params;
  const { dishName, dishLink, dishPrice, dishCategory } = req.body;
  
  try {
    const resDish = await dishes.findByIdAndUpdate(dishId, {
      dishName,
      dishCategory,
      dishLink,
      dishPrice
    }, { new: true });

    if (!resDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json(resDish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post("/cheflogin", async (req, res) => {
  const { chefEmail, chefPassword } = req.body;
  const chef = await chefs.findOne({ chefEmail: chefEmail });
  if(!chef){
    return res.status(401).json({error:"Chef not found"})
  }
  const chefPasswordMatch = await bcrypt.compare(chefPassword, chef.chefPassword);
  if (!chefPasswordMatch) {
    console.log("password not matching")
    return res.status(402).json({ error: "Incorrect password" });
  }
  else {
    try {
      const token = jwt.sign(
        { chefId: chef._id, chefEmail: chef.chefEmail },
        jwtSecret,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful",token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(501).json({ error: error.message || "Internal server error" });
    }
  }
});

router.post("/createchef", async (req, res) => {
  const { chefName, chefEmail, chefPassword } = req.body;

  try {
    const existingChef = await chefs.findOne({ chefEmail: chefEmail });
    if (existingChef) {
      return res.status(400).json({ error: "Chef already exists" });
    }
    
    let hashedChefPassword;
    try {
      hashedChefPassword = await bcrypt.hash(chefPassword, 10);
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return res.status(500).json({ error: "Error hashing password" });
    }

    const newChef = await chefs.create({ chefName, chefEmail, chefPassword: hashedChefPassword });
    const token = jwt.sign(
      { chefId: newChef._id, chefEmail: newChef.chefEmail },
      jwtSecret,
      { expiresIn: "1h" }
    );
    res.status(201).json({ message: "Chef created successfully", token });
  } catch (error) {
    console.error("Error creating chef:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  } 
});
router.post('/order', async (req, res) => {
  try {
    const { cart, totalPrice, email, name, date } = req.body;
    const order = await orders.create({ cart, totalPrice, email, name, date: date || new Date() });
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});
router.get('/order', async (req, res) => {
  try {
    const orderss = await orders.find({});
    res.json(orderss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})
router.get('/orders/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const customerOrders = await orders.find({ email: email });
    res.status(200).json(customerOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});
router.post('/complete', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).send('Order ID is required');
    }

    const order = await orders.findById(orderId);
    console.log(order)
    if (!order) {
      return res.status(404).send('Order not found');
    }

    const completedOrder = new completedorders({
      cart: order.cart,
      totalPrice: order.totalPrice,
      email: order.email,
      name: order.name,
      date: order.date,
      orderStatus: 'completed',
    });

    await completedOrder.save();
    await orders.findByIdAndDelete(orderId);

    res.send('Order completed successfully');
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).send('Server Error');
  }
});
router.get("/complete",async(req,res)=>{
  const today = moment().startOf('day').toISOString();
  try {
    const orderss = await completedorders.find({date:{
      $gte: new Date(today),
      $lt: new Date(today).setDate(new Date(today).getDate() + 1)
    }})
    res.json(orderss)
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router