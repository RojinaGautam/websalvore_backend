import express from "express";
import { testimonialController } from "../../controller/index.js";
const router = express.Router();
// Route to get all testimonials
router.get("/", testimonialController.getAllTestimonials);  
// Route to create a new testimonial
router.post("/", testimonialController.createTestimonial);

// Route to delete a testimonial by ID
router.delete("/:id", testimonialController.deleteTestimonial);

export { router as testimonialRouter };