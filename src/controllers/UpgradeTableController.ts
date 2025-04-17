import { Request, Response } from "express";
import { UpgradeTable } from "../constants/constants";
import { ControllerNoCrudDBBase } from "./ControllerNoCrudDBBase";

class UpgradeTableController extends ControllerNoCrudDBBase<
  typeof UpgradeTable
> {
  override async get(req: Request, res: Response) {
    res.status(200).json({ table: UpgradeTable });
  }
}

export { UpgradeTableController };
