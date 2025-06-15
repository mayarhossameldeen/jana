import { body } from "express-validator";

export const productValidationRules = [
  body("name").notEmpty().withMessage("Product name is required"),

  body("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or more"),

  body("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isIn(["Hair", "Skincare", "Makeup", "Bath and Body"])
    .withMessage("Category must be Hair, Skincare, Makeup, or Bath and Body"),

  body("description").optional().isString(),

  body("image").optional().isString(),
];
