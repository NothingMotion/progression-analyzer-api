import { ControllerBase } from "./ControllerBase";
import { ICrashLytics } from "../types/NotMot";
import CrudDBBase from "./CrudDBBase";
import { Request, Response } from "express";
import Logger from "../lib/Logger";

class CrashLyticsController extends ControllerBase<ICrashLytics> {
  constructor(crudDB: CrudDBBase<ICrashLytics>) {
    super(crudDB);
  }

  protected override isMatch(data: any): data is ICrashLytics {
    return (
      data &&
      typeof data === "object" &&
      "uuid" in data &&
      "type" in data &&
      "message" in data &&
      "deviceInfo" in data
    );
  }

  override async create(req: Request, res: Response): Promise<void> {
    try {
      const crash = req.body;
      if (!this.isMatch(crash)) {
        this.sendErrorResponse(res, new Error("Invalid crash data"), 400);
        return;
      }

      Logger.log(
        `Received crash report from device: ${crash.deviceInfo.deviceIdentity}`,
      );
      const savedCrash = await this.crudDB.create(crash);
      this.sendSuccessResponse(res, savedCrash, 201);
    } catch (error) {
      Logger.error(`Error saving crash report: ${(error as Error).message}`);
      this.sendErrorResponse(res, error as Error);
    }
  }
}

export { CrashLyticsController };
