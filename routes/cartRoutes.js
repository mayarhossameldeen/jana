import express from "express";
import {
  createCart,
  getCartByCustomer,
  addItemToCart,
  removeItemFromCart,
  deleteCart,
} from "../controllers/cartController.js";

import {
  cartCreationValidationRules,
  addToCartValidationRules,
} from "../validators/cartValidator.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", cartCreationValidationRules, createCart);
router.get("/:customerId", getCartByCustomer);
router.post("/:customerId/add", auth(), addToCartValidationRules, addItemToCart);
router.delete("/:customerId/remove/:productId", removeItemFromCart);
router.delete("/:customerId", deleteCart);

export default router;
