import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers['authorization'];
  let token = '';

  if (authHeader !== undefined) {
    token = authHeader.split(' ')[1];
  }
 
  if (!token) {
    return res.status(401).json({ message: 'No token provided.'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'defaultsecret') as JwtPayload;
    
    req.body.username = decoded.username;
    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token'})
  }
};