import express from "express";
import { reservationController } from "../controller/index.js";
const router = express.Router();
router.get("/", reservationController.getAll);
router.post("/", reservationController.create);
router.put("/:id", reservationController.update);
router.get("/:id", reservationController.getById);
router.delete("/:id", reservationController.deleteById);

export { router as reservationRouter }; 