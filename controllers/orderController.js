import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { validationResult } from "express-validator";

// Create Order
export const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

  try {
    const { customer, products, total, address } = req.body;
    if (!customer || !products || !Array.isArray(products) || !total || !address) {
      return res.status(400).json({ error: "Missing required order fields" });
    }
    const order = new Order({ customer, products, total, address });
    await order.save();

    // Decrease product stock
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { customer },
      { $set: { items: [], totalPrice: 0 } }
    );

    res.status(201).json(order);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer").populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("products.product");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Order
export const updateOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("customer")
      .populate("products.product");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
