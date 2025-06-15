import Service from "../models/service.js";
import { validationResult } from "express-validator";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Service
export const createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const serviceData = {
      ...req.body,
      image: req.file ? `/uploads/services/${req.file.filename}` : undefined
    };

    const service = new Service(serviceData);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    // If there's an error and a file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, '../public', req.file.path);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    }
    res.status(500).json({ error: err.message });
  }
};

// Get All Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Service
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Service
export const updateService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // If there's a new file upload, delete the old file
    if (req.file && service.image) {
      const oldFilePath = path.join(__dirname, '../public', service.image);
      fs.unlink(oldFilePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting old file:', unlinkErr);
      });
    }

    const updateData = {
      ...req.body,
      image: req.file ? `/uploads/services/${req.file.filename}` : service.image
    };

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    // If there's an error and a new file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, '../public', req.file.path);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // Delete the service image if it exists
    if (service.image) {
      const filePath = path.join(__dirname, '../public', service.image);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
