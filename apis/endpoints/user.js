const User = require("../models/user");
const Order = require("../models/order");
const crypto = require("crypto");
const sendVerificationEmail = require("../helper");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
require("dotenv").config();

const saltRounds = parseInt(process.env.SALTROUNDS);

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already register" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, password: hashedPassword });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    sendVerificationEmail(email, newUser.verificationToken);
    return res.status(200).json({ message: "Created" });
  } catch (err) {
    console.log("Error registering user", err);
    res.status(500).json({ message: "Registration Failed" });
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified." });
  } catch (err) {
    res.status(500).json({ message: "Email could not be verified." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userId: user._id }, secretKey);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Failed to login" });
  }
});

router.post("/add/address", async (req, res) => {
  try {
    const { token, address } = req.body;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.addresses.push(address);
    user.save();

    return res.status(200).json({
      message: "Address saved successfully",
      addresses: user.addresses,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving address" });
  }
});

router.get("/addresses/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ addresses: user.addresses });
  } catch (e) {
    res.status(500).json({ message: "Error retrieving addresses." });
  }
});

router.post("/order/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const { cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.price,
      image: item.image,
      price: item.price,
    }));

    const order = new Order({
      user: userId,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    await order.save();
    res.status(200).json({ message: "Order Placed" });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ message: "Error placing order." });
  }
});

router.get("/profile/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: "Error getting profile." });
  }
});

router.get("/orders/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json({ orders });
  } catch (e) {
    res.status(500).json({ message: "Error getting orders." });
  }
});

router.post("/remove/:token", async (req, res) => {
  try {
    const { id } = req.body;
    const token = req.params.token;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const address = user.addresses.filter((address) => !address._id.equals(id));
    user.addresses = address;
    await user.save();
    res.status(200).json({ message: "Address Removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing orders." });
  }
});

router.post("/edit/address", async (req, res) => {
  try {
    const { address, token } = req.body;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const left = user.addresses.filter((add) => !add._id.equals(address._id));
    left.push(address);
    user.addresses = left;
    await user.save();
    res
      .status(200)
      .json({ addresses: user.addresses, message: "Edited Succefully" });
  } catch (e) {
    res.status(500).json({ message: "Error editing address." });
  }
});

module.exports = router;
