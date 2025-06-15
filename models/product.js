import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: String,
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be a positive number"],
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock must be 0 or more"],
  },
  image: String,
  category: {
    type: String,
    enum: {
      values: ["Hair", "Skincare", "Makeup", "Bath and Body"],
      message: "Category must be Hair, Skincare, Makeup, or Bath and Body",
    },
    required: [true, "Product category is required"],
  },
});

export default mongoose.model("Product", productSchema);
