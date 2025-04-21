import { Router } from "express";
import {
  NotMotController,
  TrackController,
} from "../controllers/NotMotController";
import { NotMotModel } from "../models/NotMotModel";
import { INotMot } from "../types/NotMot";
import CrudDBBase from "../controllers/CrudDBBase";
import { TrackModel } from "../models/TrackModel";
import { ITrack } from "../types/ITrack";
import { CrashLyticsController } from "../controllers/CrashLyticsController";
import { CrashLyticsModel } from "../models/CrashLyticsModel";
import { ICrashLytics } from "../types/NotMot";

const router = Router();
const controller = new NotMotController(new CrudDBBase<INotMot>(NotMotModel));
const trackController = new TrackController(new CrudDBBase<ITrack>(TrackModel));
const crashLyticsController = new CrashLyticsController(
  new CrudDBBase<ICrashLytics>(CrashLyticsModel),
);

router.get("/latest", controller.getLatestUpdate.bind(controller));
router
  .route("/crashlytics")
  .post(crashLyticsController.create.bind(crashLyticsController));
router
  .route("/track")
  .get(trackController.getAll.bind(trackController))
  .post(trackController.create.bind(trackController));

router
  .route("/")
  .get(controller.getAll.bind(controller))
  .post(controller.create.bind(controller));

export { router as notmotRouter };
