import express from "express";
import { userController } from "../../controller/index.js";
const router = express.Router();
router.get("/", userController.getAll);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.get("/:id", userController.getById);
router.delete("/:id", userController.delelteById);

// Forgot password routes
router.get("/forgotten/list", userController.getForgottenUsers);
router.post("/forgot-password", userController.requestForgotPassword);
router.put("/:id/reset-password", userController.resetPassword);

export { router as userRouter };
