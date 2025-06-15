import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { userValidationRules } from "../validators/userValidator.js";

const router = express.Router();

router.post("/", userValidationRules, createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", userValidationRules, updateUser);
router.delete("/:id", deleteUser);

export default router;
