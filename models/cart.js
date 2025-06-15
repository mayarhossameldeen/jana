import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"],
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "Quantity must be at least 1"],
  },
});

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Customer is required"],
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
    min: [0, "Total must be a positive number"],
  },
});

cartSchema.methods.addToCart = function (productId, quantity = 1) {
  const existing = this.items.find(
    (item) => item.product.toString() === productId.toString()
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    this.items.push({ product: productId, quantity });
  }
  this.updatedAt = Date.now();
  return this.save();
};

cartSchema.methods.removeFromCart = function (productId) {
  this.items = this.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );
  this.updatedAt = Date.now();
  return this.save();
};

export default mongoose.model("Cart", cartSchema);
