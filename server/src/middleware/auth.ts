import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers["authorization"];
  let token = "";

  console.log(`@authenticateToken...`);

  if (authHeader !== undefined) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    console.log(
      `@authenticateToken - Could not parse token from the request header`
    );
    return res.status(401).json({ message: "No token provided." });
  }
  console.log(`@authenticateToken - token value is:[${token}]`);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "defaultsecret"
    ) as JwtPayload;

    const decodedJson = JSON.stringify(decoded);
    console.log(
      `@authenticateToken - authentication success and the username is:[${decoded.username}]`
    );

    req.body.username = decoded.username;
    return next();
  } catch (error) {
    console.log(`@authenticateToken - invalid token ${error}`);
    return res.status(403).json({ message: "Invalid token" });
  }
};
