import { body } from "express-validator";

export const orderValidationRules = [
  body("customer")
    .notEmpty().withMessage("Customer ID is required")
    .isMongoId().withMessage("Invalid customer ID format"),

  body("products")
    .isArray({ min: 1 }).withMessage("Products must be a non-empty array"),

  body("products.*.product")
    .notEmpty().withMessage("Product ID is required")
    .isMongoId().withMessage("Invalid product ID format"),

  body("products.*.quantity")
    .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),

    

  body("total")
    .notEmpty().withMessage("Total is required")
    .isFloat({ min: 0 }).withMessage("Total must be a positive number"),

  body("address")
    .notEmpty().withMessage("Address Is Required"),

  body("status")
    .optional()
    .isIn(["processing", "shipped", "delivered", "cancelled"]).withMessage("Invalid order status"),
];
