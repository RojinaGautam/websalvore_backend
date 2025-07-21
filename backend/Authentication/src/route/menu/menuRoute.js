import express from "express";
import { menuController } from "../../controller/index.js";
import upload from "../../middleware/multerConfig.js";
const router = express.Router();
router.get("/", menuController.getAll);
router.post("/", upload.single('image'), menuController.create);
router.put("/:id", upload.single('image'), menuController.update);
router.get("/:id", menuController.getById);
router.delete("/:id", menuController.deleteById);

export { router as menuRouter }; 