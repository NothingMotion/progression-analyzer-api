import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const jwtAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Authorization header must start with Bearer" });
  }

  // Extract the token by removing the 'Bearer ' prefix
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "", {
      ignoreExpiration: true,
    });
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to authenticate token",
      error: (error as Error).message,
    });
    return;
  }
  next();
};

export default jwtAuthMiddleware;
