import { Router } from "express";
import { AccountController } from "../controllers/AccountController";
import CrudDBBase from "../controllers/CrudDBBase";
import { BrawlStarsAccount } from "../types/IAccount";
import { AccountModel } from "../models/AccountModel";
import { AccountUtils } from "../utils/AccountUtils";
const router = Router();
const accountDb = new CrudDBBase<BrawlStarsAccount>(AccountModel);
router.route("/:tag").get(async (req, res) => {
  try {
    const tag = req.params.tag;
    const account = await accountDb
      .readByQuery({ "account.account.tag": tag })
      .then(async (account) => {
        if (account.length === 0) {
          // create account steps..
          const parsedTag = AccountUtils.parseTag(tag);
          const isValid = AccountUtils.isValidTag(parsedTag);
          if (!isValid) {
            res.status(400).json({ message: "invalid tag" });
            return;
          }
          try {
            const account = await AccountUtils.getAccount(parsedTag);
            if (!account) {
              res
                .status(400)
                .json({ message: "account not found or could not be fetched" });
              return;
            }
            await accountDb.create(account);
            res.status(200).json(account);
          } catch (error) {
            res.status(500).json({ message: (error as Error).message });
          }
          return;
        }
        return account[0];
      });
    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
router.route("/:tag/update").post(async (req, res) => {
  const tag = req.params.tag;
  const account = await accountDb.readByQuery({ "account.tag": tag });
  if (account.length === 0) {
    res.status(404).json({ message: "Account not found" });
    return;
  }
  // updating account steps..
  res.status(200).json(account[0]);
});

router.route("/updateAll").post(async (req, res) => {
  const accounts = await accountDb.readAll();
  if (accounts.length === 0) {
    res.status(404).json({ message: "No accounts found" });
    return;
  }
  for await (const account of accounts) {
    try {
      await AccountUtils.updateAccount(account.account.account.tag);
      //   await accountDb.update(account._id, {});
    } catch (error) {
      console.log(error);
      continue;
    }
  }
  res.status(200).json({ message: "All accounts updated" });
});
export { router };
