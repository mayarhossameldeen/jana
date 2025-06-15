import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Customer is required"],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, "Service is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "confirmed", "completed", "cancelled"],
      message: "Status must be pending, confirmed, completed, or cancelled",
    },
    default: "pending",
  },
  notes: String,
});

export default mongoose.model("Booking", bookingSchema);
