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

const router = Router();
const controller = new NotMotController(new CrudDBBase<INotMot>(NotMotModel));
const trackController = new TrackController(new CrudDBBase<ITrack>(TrackModel));

router.get("/latest", controller.getLatestUpdate.bind(controller));
router
  .route("/track")
  .get(trackController.getAll.bind(trackController))
  .post(trackController.create.bind(trackController));

router
  .route("/")
  .get(controller.getAll.bind(controller))
  .post(controller.create.bind(controller));

// router
//   .route("/:id")
//   .get(controller.getById.bind(controller))
//   .put(controller.update.bind(controller))
//   .delete(controller.delete.bind(controller));

// router
//   .route("/track/:id")
//   .get(trackController.getById.bind(trackController))
//   .patch(trackController.update.bind(trackController))
//   .delete(trackController.delete.bind(trackController));
export { router as notmotRouter };
