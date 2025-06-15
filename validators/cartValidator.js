import { body } from "express-validator";

export const addToCartValidationRules = [
  body("product")
    .notEmpty().withMessage("Product ID is required")
    .isMongoId().withMessage("Invalid product ID"),

  body("quantity")
    .optional()
    .isInt({ min: -100, max: 100 }).withMessage("Quantity must be a non-zero integer between -100 and 100")
    .not().equals(0).withMessage("Quantity cannot be zero"),
];

export const cartCreationValidationRules = [
  body("customer")
    .notEmpty().withMessage("Customer ID is required")
    .isMongoId().withMessage("Invalid customer ID"),
];
