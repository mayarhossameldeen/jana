import { body } from "express-validator";

export const userValidationRules = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone")
    .optional()
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be 10 to 15 digits"),

  body("role")
    .optional()
    .isIn(["customer", "admin"])
    .withMessage("Role must be customer,or admin"),
];
