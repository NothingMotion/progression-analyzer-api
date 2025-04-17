import { Request, Response } from "express";
import { BrawlerRarityTable } from "../constants/constants";
import { ControllerNoCrudDBBase } from "./ControllerNoCrudDBBase";

class BrawlerRarityTableController extends ControllerNoCrudDBBase<
  typeof BrawlerRarityTable
> {
  override async get(req: Request, res: Response) {
    res.status(200).json({ table: BrawlerRarityTable });
  }
}
export { BrawlerRarityTableController };
