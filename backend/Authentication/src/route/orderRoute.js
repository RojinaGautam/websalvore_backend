import express from "express";
import { createOrder, getOrders, getOrderById, updateOrderStatus } from "../controller/order/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get order by ID
router.get("/:id", getOrderById);

// Update orderStatus
router.patch("/:id/status", updateOrderStatus);

export default router; 