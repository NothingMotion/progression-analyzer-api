import { Router } from "express";
import { NotMotController } from "../controllers/NotMotController";
import { NotMotModel } from "../models/NotMotModel";

import { INotMot } from "../types/NotMot";
import CrudDBBase from "../controllers/CrudDBBase";

const router = Router();
const controller = new NotMotController(new CrudDBBase<INotMot>(NotMotModel));

router.get("/latest", controller.getLatestUpdate.bind(controller));

router
  .route("/")
  .get(controller.getAll.bind(controller))
  .post(controller.create.bind(controller));

router
  .route("/:id")
  .get(controller.getById.bind(controller))
  .put(controller.update.bind(controller))
  .delete(controller.delete.bind(controller));

export { router as notmotRouter };
