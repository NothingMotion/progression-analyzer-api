import { Request, Response } from "express";
import { BrawlStarsAccount } from "../types/IAccount";
import { ControllerBase } from "./ControllerBase";
import { AccountUtils } from "../utils/AccountUtils";
import { BrawlStarsAPIError } from "../lib/BrawlStarsAPI";
import { BrawlStarsAPI } from "../constants/constants";
class AccountController extends ControllerBase<BrawlStarsAccount> {
  override isMatch(data: any): data is BrawlStarsAccount {
    return data && typeof data === "object" && "account" in data;
  }

  override async getById(req: Request, res: Response): Promise<void> {
    try {
      const accountTag = req.params.tag;
      const isValid = AccountUtils.isValidTag(accountTag);
      if (!accountTag) {
        this.sendErrorResponse(res, new Error("Invalid account tag"), 400);
        return;
      }
      if (!isValid) {
        this.sendErrorResponse(res, new Error("Invalid account tag"), 400);
        return;
      }
      const account = await this.crudDB.readByQuery({
        account: { tag: accountTag },
      });
      if (!account || account.length === 0) {
        // inserting account
        const parsedTag = AccountUtils.parseTag(accountTag);
        const account = await AccountUtils.getAccount(parsedTag);
        if (!account) {
          this.sendErrorResponse(res, new Error("Account not found"), 404);
          return;
        }

        if (account instanceof Error) {
          this.sendErrorResponse(res, account, 500);
          return;
        }
        await this.crudDB.create(account);
        this.sendSuccessResponse(res, account);
      }
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, error as Error, error.statusCode);
      }
      this.sendErrorResponse(res, error as Error, 500);
    }
  }

  async refreshById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const account = await AccountUtils.updateAccount(id);
      if (!account) {
        this.sendErrorResponse(res, new Error("Account not found"), 404);
        return;
      }

      if (account instanceof Error) {
        this.sendErrorResponse(res, account);
        return;
      }
      this.sendSuccessResponse(res, account);
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }

  async refreshAll(req: Request, res: Response): Promise<void> {
    try {
      const accounts = await this.crudDB.readAll();
      for (const account of accounts) {
        // todo: refresh account
      }
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }

  async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { limit, offset } = req.query;
      const account = await this.crudDB.readByQuery({ account: { tag: id } });
      if (!account || account.length === 0) {
        this.sendErrorResponse(res, new Error("History not found"), 404);
        return;
      }
      const history = account[0].history;
      const paginatedHistory = history.slice(
        offset ? parseInt(offset as string) : 0,
        limit ? parseInt(limit as string) : 10,
      );
      const response = {
        length: history.length,
        history: paginatedHistory,
        offset: offset ? parseInt(offset as string) : 0,
        limit: limit ? parseInt(limit as string) : 10,
      };
      res.status(200).json(response);
    } catch (error) {
      this.sendErrorResponse(res, error as Error);
    }
  }
}
export { AccountController };
