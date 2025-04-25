import { Request, Response } from "express";
import { IAccessToken, IRefreshToken, IToken } from "../types/IAccessToken";
import { ICrudDB } from "../types/ICrudDB";
import { ControllerBase } from "./ControllerBase";
import { ControllerNoCrudDBBase } from "./ControllerNoCrudDBBase";
import jwt from "jsonwebtoken";
import Logger from "../lib/Logger";
class AccessTokenController extends ControllerNoCrudDBBase<IToken> {
  constructor() {
    super();
  }

  override async get(req: Request, res: Response): Promise<void> {
    try {
      const {
        authorization,
        "application-request-sender": applicationRequestSender,
      } = req.headers;
      console.log("application request sender is :", applicationRequestSender);
      if (!authorization) {
        console.log("didn't specifed authorization");
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      if (!applicationRequestSender || applicationRequestSender !== "android") {
        res.status(401).json({ message: "You cannot access this endpoint" });
        return;
      }
      const decoded = jwt.verify(
        authorization.split(" ")[1] as string,
        process.env.APPLICATION_FRONTEND_JWT_SECRET as string,
        // {
        //   ignoreExpiration: true,
        //   ignoreNotBefore: true,
        // },
      );
      if (!decoded) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const accessToken = jwt.sign(
        {
          // @ts-ignore
          userId: decoded.userId,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" },
      );
      const response: IToken = {
        token: accessToken,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      };
      res.status(200).json({ message: "Authorized", response });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async getRefreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { authorization: token } = req.headers;
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const decoded = jwt.verify(
        token.split(" ")[1] as string,
        process.env.JWT_SECRET as string,
      );

      if (!decoded) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const refreshToken = jwt.sign(
        {
          // @ts-ignore
          userId: decoded.userId,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "40m" },
      );
      res.status(200).json({ message: "Authorized", refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async isValidAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const { authorization: token } = req.headers;
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const decoded = jwt.verify(
        token.split(" ")[1] as string,
        process.env.JWT_SECRET as string,
      );
      if (!decoded) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      res.status(200).json({ message: "Authorized" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

export { AccessTokenController };
