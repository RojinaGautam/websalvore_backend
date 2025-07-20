import express from "express";
import { menuController } from "../../controller/index.js";
const router = express.Router();
router.get("/", menuController.getAll);
router.post("/", menuController.create);
router.put("/:id", menuController.update);
router.get("/:id", menuController.getById);
router.delete("/:id", menuController.deleteById);

export { router as menuRouter }; 