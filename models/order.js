import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Customer is required"],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        min: [1, "Quantity must be at least 1"],
      },
    },
  ],
  total: {
    type: Number,
    required: [true, "Total is required"],
    min: [0, "Total must be a positive number"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["processing", "shipped", "delivered", "cancelled"],
      message: "Invalid order status",
    },
    default: "processing",
  },
});

export default mongoose.model("Order", orderSchema);
