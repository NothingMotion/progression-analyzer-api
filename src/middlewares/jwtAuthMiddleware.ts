import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const jwtAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
};

export default jwtAuthMiddleware;
