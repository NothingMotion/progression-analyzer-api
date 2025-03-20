import { Router } from "express";
import { AccountController } from "../controllers/AccountController";
import CrudDBBase from "../controllers/CrudDBBase";
import { BrawlStarsAccount } from "../types/IAccount";
import { AccountModel } from "../models/AccountModel";

const router = Router();
const controller = new AccountController(
  new CrudDBBase<BrawlStarsAccount>(AccountModel),
);
router.route("/").post(controller.create).get(controller.getAll);
router
  .route("/:id")
  .get(controller.getById)
  .put(controller.update)
  .delete(controller.delete);
export { router };
