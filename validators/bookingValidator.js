import { body } from "express-validator";

export const bookingValidationRules = [
  body("customer")
    .notEmpty().withMessage("Customer ID is required")
    .isMongoId().withMessage("Invalid customer ID"),

  body("service")
    .notEmpty().withMessage("Service ID is required")
    .isMongoId().withMessage("Invalid service ID"),

  body("date")
    .notEmpty().withMessage("Date is required")
    .isISO8601().withMessage("Date must be a valid ISO8601 date"),

  body("time")
    .notEmpty().withMessage("Time is required"),

  body("status")
    .optional()
    .isIn(["pending", "confirmed", "completed", "cancelled"]).withMessage("Invalid booking status"),

  body("notes")
    .optional()
    .isString(),
];
