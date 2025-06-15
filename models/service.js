import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: [true, "Service price is required"],
    min: [0, "Price must be a positive number"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [10, "Minimum duration is 10 minutes"],
  },
  category: {
    type: String,
    enum: {
      values: ["Hair", "Nails", "Body Care", "Makeup", "Bridal"],
      message: "Category must be Hair, Nails, Body Care, Makeup, or Bridal",
    },
    required: [true, "Service category is required"],
  },
  image: String,
});

export default mongoose.model("Service", serviceSchema);
