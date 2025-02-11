import express from "express";
import { getUserById, createUser } from "../../controllers/user-controller.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

// POST request - creates a new user
router.post("/", createUser);

// GET request - gets user by id
router.get("/:id", authenticateToken, getUserById);

export { router as userRouter };
