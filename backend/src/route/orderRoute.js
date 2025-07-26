import express from "express";
import { createOrder, getOrders, getOrderById, updateOrderStatus, getDashboardStats } from "../controller/order/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get dashboard statistics (must come before :id route)
router.get("/dashboard/stats", getDashboardStats);

// Get order by ID
router.get("/:id", getOrderById);

// Update orderStatus
router.patch("/:id/status", updateOrderStatus);

export default router; 