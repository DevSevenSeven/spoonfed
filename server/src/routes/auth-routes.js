import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username },
    });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const jwtKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, jwtKey, { expiresIn: '1h' });
    return res.json({ token });
};
const router = Router();
router.post('/login', login);
export default router;
