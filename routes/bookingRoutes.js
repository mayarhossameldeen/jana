import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import { bookingValidationRules } from "../validators/bookingValidator.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth(["customer"]), bookingValidationRules, createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", bookingValidationRules, updateBooking);
router.delete("/:id", deleteBooking);

export default router;
