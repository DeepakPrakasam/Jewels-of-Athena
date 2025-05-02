const express = require("express");
const { ObjectId } = require("mongodb");
const connectDB = require("../db/mongoClient");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Place an order (supports single or multiple items)
router.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { items, shippingDetails } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0 || !shippingDetails) {
    return res.status(400).json({ message: "Missing order items or shipping details" });
  }

  try {
    const db = await connectDB();
    const productsCollection = db.collection("products");
    const ordersCollection = db.collection("orders");

    // Fetch full product data for all item.productId
    const itemDetails = await Promise.all(items.map(async (item) => {
      const product = await productsCollection.findOne({ _id: new ObjectId(item.productId) });
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      return {
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      };
    }));

    const totalAmount = itemDetails.reduce((sum, item) => sum + item.subtotal, 0);

    const order = {
      userId,
      items: itemDetails,
      shippingDetails,
      totalAmount,
      status: "Pending",
      createdAt: new Date(),
    };

    const result = await ordersCollection.insertOne(order);

    res.status(201).json({
      message: "✅ Order placed successfully",
      orderId: result.insertedId,
    });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

module.exports = router;
