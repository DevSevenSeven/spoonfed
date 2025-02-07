import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let token = '';
    if (authHeader !== undefined) {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'defaultsecret');
        req.body.username = decoded.username;
        return next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
