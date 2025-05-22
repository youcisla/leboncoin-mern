import express from "express";
import { getCurrentUser, loginUser, registerUser, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);
router.put("/me", authMiddleware, updateUser);

export default router;
