import { Testimonials } from '../../models/index.js';


/**
 * fetch all testimonials
 */

const getAllTestimonials = async (req, res) => {
  try {
    // Fetching all the testimonials from the database
    const testimonials = await Testimonials.findAll();
    res.status(200).send({ data: testimonials, message: "Testimonials fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
}

const createTestimonial = async (req, res) => {
    try {
        const { name, email, message, rating, favouriteDish } = req.body;
    
        // Validation
        if (!name || !email || !message || rating === undefined || !favouriteDish) {
            return res.status(400).send({ message: "All fields are required" });
        }
    
        // Create a new testimonial
        const testimonial = await Testimonials.create({
            name,
            email,
            message,
            rating,
            favouriteDish
        });
    
        res.status(201).send({ data: testimonial, message: "Testimonial created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create testimonial' });
    }
}

    const deleteTestimonial = async (req, res) => { 
    try {
        const { id } = req.params;
    
        // Find the testimonial by ID
        const testimonial = await Testimonials.findByPk(id);
        if (!testimonial) {
            return res.status(404).send({ message: "Testimonial not found" });
        }
    
        // Delete the testimonial
        await testimonial.destroy();
    
        res.status(200).send({ message: "Testimonial deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
}



export const testimonialController = {
  getAllTestimonials,
  createTestimonial,
  deleteTestimonial,
};