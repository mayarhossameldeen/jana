import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { productValidationRules } from "../validators/productValidator.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single('image'), productValidationRules, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single('image'), productValidationRules, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
