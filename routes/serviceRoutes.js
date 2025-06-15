import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { serviceValidationRules } from "../validators/serviceValidator.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single('image'), serviceValidationRules, createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", upload.single('image'), serviceValidationRules, updateService);
router.delete("/:id", deleteService);

export default router;
