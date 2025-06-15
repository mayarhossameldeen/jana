import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { orderValidationRules } from "../validators/orderValidator.js";

const router = express.Router();

router.post("/", orderValidationRules, createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", orderValidationRules, updateOrder);
router.delete("/:id", deleteOrder);

export default router;
