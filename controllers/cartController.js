import Cart from "../models/cart.js";
import { validationResult } from "express-validator";

// Create empty cart for customer
export const createCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const existing = await Cart.findOne({ customer: req.body.customer });
    if (existing) return res.status(400).json({ error: "Cart already exists for this customer" });

    const cart = new Cart({ customer: req.body.customer });
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart by customer
export const getCartByCustomer = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customer: req.params.customerId })
      .populate("items.product");
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add item to cart
export const addItemToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { customerId } = req.params;
    const { product, quantity } = req.body;

    let cart = await Cart.findOne({ customer: customerId });
    if (!cart) {
      cart = new Cart({ customer: customerId, items: [] });
    }

    const existing = cart.items.find(
      (item) => item.product.toString() === product.toString()
    );
    if (existing) {
      existing.quantity += quantity;
      if (existing.quantity <= 0) {
        // Remove item if quantity is 0 or less
        cart.items = cart.items.filter(
          (item) => item.product.toString() !== product.toString()
        );
      }
    } else if (quantity > 0) {
      cart.items.push({ product, quantity });
    }

    await cart.save();
    const updated = await cart.populate("items.product");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  try {
    const { customerId, productId } = req.params;
    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    await cart.removeFromCart(productId);
    const updated = await cart.populate("items.product");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete cart
export const deleteCart = async (req, res) => {
  try {
    const { customerId } = req.params;
    const deleted = await Cart.findOneAndDelete({ customer: customerId });
    if (!deleted) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
