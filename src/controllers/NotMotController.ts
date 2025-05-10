import CrudDBBase from "./CrudDBBase";
import { INotMot } from "../types/NotMot";
import { NotMotModel } from "../models/NotMotModel";
import { Request, Response } from "express";
import { ControllerBase } from "./ControllerBase";
import { ITrack } from "../types/ITrack";

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

class TrackController extends ControllerBase<ITrack> {
  constructor(crudDB: CrudDBBase<ITrack>) {
    super(crudDB);
  }
  override async getById(req: Request, res: Response): Promise<void> {
    try {
      const track = await this.crudDB.readByQuery({ uuid: req.params.id });
      if (track.length === 0) {
        res.status(404).json({ message: "Track not found" });
        return;
      }
      res.status(200).json(track[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
  override async create(req: Request, res: Response): Promise<void> {
    try {
      const track = await this.crudDB.create(req.body);
      res.status(201).json(track);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
export { NotMotController, TrackController };
