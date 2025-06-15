import { body } from "express-validator";

export const serviceValidationRules = [
  body("name").notEmpty().withMessage("Service name is required"),

  body("price")
    .notEmpty()
    .withMessage("Service price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ min: 10 })
    .withMessage("Minimum duration is 10 minutes"),

  body("category")
    .notEmpty()
    .withMessage("Service category is required")
    .isIn(["Hair", "Nails", "Body Care", "Makeup", "Bridal"])
    .withMessage("Category must be Hair, Nails, Spa, Makeup, or Skin"),

  body("description").optional().isString(),

  body("image").optional().isString(),
];
