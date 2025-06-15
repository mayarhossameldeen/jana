import Product from "../models/product.js";
import { validationResult } from "express-validator";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create product
export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const productData = {
      ...req.body,
      image: req.file ? `/uploads/products/${req.file.filename}` : undefined
    };

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    // If there's an error and a file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, '../public', req.file.path);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    }
    res.status(500).json({ error: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // If there's a new file upload, delete the old file
    if (req.file && product.image) {
      const oldFilePath = path.join(__dirname, '../public', product.image);
      fs.unlink(oldFilePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting old file:', unlinkErr);
      });
    }

    const updateData = {
      ...req.body,
      image: req.file ? `/uploads/products/${req.file.filename}` : product.image
    };

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    // If there's an error and a new file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, '../public', req.file.path);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete the product image if it exists
    if (product.image) {
      const filePath = path.join(__dirname, '../public', product.image);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
