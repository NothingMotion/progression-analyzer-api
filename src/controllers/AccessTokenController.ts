import { Request, Response } from "express";
import { IAccessToken, IRefreshToken, IToken   } from "../types/IAccessToken";
import { ICrudDB } from "../types/ICrudDB";
import { ControllerBase } from "./ControllerBase";
import { ControllerNoCrudDBBase } from "./ControllerNoCrudDBBase";
import jwt from "jsonwebtoken";
class AccessTokenController extends ControllerNoCrudDBBase<IToken> {
  constructor() {
    super();
  }

  override async get(req: Request, res: Response): Promise<void> {
    const { token , "application-request-sender": applicationRequestSender } =
      req.headers;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!applicationRequestSender || applicationRequestSender !== "android") {
      res.status(401).json({ message: "You cannot access this endpoint" });
      return;
    }
    const decoded = jwt.verify(
      token as string,
      process.env.APPLICATION_FRONTEND_JWT_SECRET as string,
    );
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );
    const response : IToken = {
      token: accessToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };
    res.status(200).json({ message: "Authorized", response });
  }

  async getRefreshToken(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    );

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "40m" },
    );
    res.status(200).json({ message: "Authorized", accessToken });
  }
}

export { AccessTokenController };
