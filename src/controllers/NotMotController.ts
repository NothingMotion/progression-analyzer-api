import CrudDBBase from "./CrudDBBase";
import { INotMot } from "../types/NotMot";
import { NotMotModel } from "../models/NotMotModel";
import { Request, Response } from "express";
import { ControllerBase } from "./ControllerBase";

class NotMotController extends ControllerBase<INotMot> {
  constructor(crudDB: CrudDBBase<INotMot>) {
    super(crudDB);
  }
  async getLatestUpdate(req: Request, res: Response): Promise<void> {
    try {
      const latestUpdate = await NotMotModel.findOne({
        isReleased: true,
      });
      res.status(200).json(latestUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

export { NotMotController };
