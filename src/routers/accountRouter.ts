import { Router } from "express";
import { AccountController } from "../controllers/AccountController";
import CrudDBBase from "../controllers/CrudDBBase";
import { BrawlStarsAccount } from "../types/IAccount";
import { AccountModel, HistoryModel } from "../models/AccountModel";

const router = Router();

const controller = new AccountController(
  new CrudDBBase<BrawlStarsAccount>(AccountModel),
  new CrudDBBase<BrawlStarsAccount>(HistoryModel),
);
router
  .route("/")
  .post(controller.create.bind(controller))
  .get(controller.getAll.bind(controller));

router.route("/refresh").get(controller.refreshAll.bind(controller));
router.route("/:id/refresh").get(controller.refreshById.bind(controller));
router.route("/:id/raw").get(controller.getRaw.bind(controller));
router.route("/:id/extra").get(controller.getExtra.bind(controller));
router.route("/:id/history").get(controller.getHistory.bind(controller));

router
  .route("/:id")
  .get(controller.getById.bind(controller))
  .patch(controller.update.bind(controller))
  .delete(controller.delete.bind(controller));

export { router };
