import express from 'express';
import { getUserById, createUser } from '../../controllers/user-controller.js';
const router = express.Router();
// GET request - gets user by id
router.get('/:id', getUserById);
// POST request - creates a new user
router.post('/', createUser);
export { router as userRouter };
