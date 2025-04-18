import { Request, Response } from "express";
import { BrawlStarsAccount } from "../types/IAccount";
import { ControllerBase } from "./ControllerBase";
import { AccountUtils } from "../utils/AccountUtils";
import { BrawlStarsAPIError } from "../lib/BrawlStarsAPI";
import { BrawlStarsAPI } from "../constants/constants";
import { BrawlStarsAPIProvider } from "../di";
import Logger from "../lib/Logger";
import { ICrudDB } from "../types/ICrudDB";
import { sleep } from "../utils/sleep";
class AccountController extends ControllerBase<BrawlStarsAccount> {
  private historyCrudDB: ICrudDB<BrawlStarsAccount>;
  constructor(
    crudDB: ICrudDB<BrawlStarsAccount>,
    historyCrudDB: ICrudDB<BrawlStarsAccount>,
  ) {
    super(crudDB);
    this.historyCrudDB = historyCrudDB;
  }
  override isMatch(data: any): data is BrawlStarsAccount {
    return data && typeof data === "object" && "account" in data;
  }

  override async getById(req: Request, res: Response): Promise<void> {
    try {
      const accountTag = AccountUtils.convertTag(req.params.id);
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
        "account.tag": accountTag,
      });

      if (!account || account.length === 0) {
        console.log(
          `AccountController::get, couldn't find account: ${accountTag}`,
        );
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
      } else {
        this.sendSuccessResponse(res, account[0], 200);
      }
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, error as Error, error.statusCode);
        return;
      }
      this.sendErrorResponse(res, error as Error, 500);
    }
  }

  override async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const account = await this.crudDB.readByQuery({
        "account.tag": AccountUtils.convertTag(id),
      });
      if (!account || account.length === 0) {
        this.sendErrorResponse(res, new Error("Account not found"), 404);
        return;
      }
      await this.historyCrudDB.deleteByOne({
        accountId: account[0]._id,
      });
      await this.crudDB.deleteByOne({
        "account.tag": AccountUtils.convertTag(id),
      });
      this.sendSuccessResponse(res, account);
    } catch (error) {
      this.sendErrorResponse(res, error as Error, 500);
    }
  }

  override async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const account = await this.crudDB.readByQuery({
        "account.tag": AccountUtils.convertTag(id),
      });
      if (!account || account.length === 0) {
        this.sendErrorResponse(res, new Error("Account not found"), 404);
        return;
      }
      if (this.isMatch(req.body)) {
        const updatedAccount = await this.crudDB.updateOneByQuery(
          { "account.tag": AccountUtils.convertTag(id) },
          req.body as BrawlStarsAccount,
          { new: true, upsert: true, setDefaultsOnInsert: true, strict: true },
        );
        this.sendSuccessResponse(res, updatedAccount);
      } else {
        this.sendErrorResponse(res, new Error("Invalid account data"), 400);
        return;
      }
    } catch (error) {
      this.sendErrorResponse(res, error as Error, 500);
    }
  }
  async getRaw(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!AccountUtils.isValidTag(id)) {
        this.sendErrorResponse(res, new Error("Invalid Account Tag"), 400);
        return;
      }
      const parsedTag = AccountUtils.parseTag(id);
      const bs = BrawlStarsAPIProvider.getInstance();

      const account = await bs.get(parsedTag);
      if (account instanceof Error) {
        this.sendErrorResponse(res, account);
        return;
      }
      res.status(200).json(account);
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, error as Error, error.statusCode);
        return;
      }
      this.sendErrorResponse(res, error as Error, 500);
    }
  }

  async getExtra(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!AccountUtils.isValidTag(id)) {
        this.sendErrorResponse(res, new Error("Invalid Account Tag"), 400);
        return;
      }
      const parsedTag = AccountUtils.parseTag(id);

      const account = await BrawlStarsAPIProvider.getInstance().getExtra(
        parsedTag,
      );
      if (account instanceof Error) {
        this.sendErrorResponse(res, account);
        return;
      }
      res.status(200).json(account);
    } catch (error) {
      this.sendErrorResponse(res, error as Error, 500);
    }
  }
  async refreshById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const accountTag = AccountUtils.convertTag(id);

      const account = await this.crudDB.readByQuery({
        "account.tag": accountTag,
      });
      if (!account || account.length === 0) {
        console.log(
          `AccountController::refreshById, couldn't find account: ${accountTag}`,
        );
        this.sendErrorResponse(res, new Error("Account not found"), 404);
        return;
      }
      if (account instanceof Error) {
        this.sendErrorResponse(res, account);
        return;
      }
      if (Date.now() - account[0].updatedAt.getTime() < 1000 * 60 * 60 * 24) {
        // 1day
        this.sendSuccessResponse(res, account[0]);
        return;
      }
      const updated = await AccountUtils.updateAccount(accountTag);
      if (!updated) {
        this.sendErrorResponse(res, new Error("Account didn't update"), 404);
        return;
      }
      if (updated instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, updated, updated.statusCode);
        return;
      }
      if (updated instanceof Error) {
        this.sendErrorResponse(res, updated);
        return;
      }
      const history = await this.historyCrudDB.readByQuery({
        accountId: updated._id,
      });
      if (!(history instanceof Error)) {
        updated.history = history;
      }

      this.sendSuccessResponse(res, updated);
    } catch (error) {
      console.log(error);
      if (error instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, error as Error, error.statusCode);
        return;
      }
      this.sendErrorResponse(res, error as Error);
    }
  }

  async refreshAll(req: Request, res: Response): Promise<void> {
    try {
      Logger.log("Refreshing all accounts");
      const accounts = await this.crudDB.readAll();
      if (!accounts || accounts.length === 0) {
        this.sendErrorResponse(res, new Error("No accounts found"), 404);
        return;
      }

      this.sendSuccessResponse(res, []);
      console.log(`Starting refresh accounts job ${new Date().toISOString()}`);
      let i = 0;
      for await (const account of accounts) {
        // todo: refresh account
        try {
          console.log(`Refreshing account ${account.account.tag} job ${i}`);
          const id = account.account.tag;
          if (Date.now() - account.updatedAt.getTime() < 1000 * 60 * 60 * 24) {
            // 1day
            continue;
          }
          const updated = await AccountUtils.updateAccount(id);
          if (!updated || updated instanceof Error) continue;
        } catch (error) {
          Logger.error((error as Error).message);
        } finally {
          i++;
          await sleep(1000);
        }
      }
      console.log(`Finished refresh accounts job ${new Date().toISOString()}`);
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, error as Error, error.statusCode);
        return;
      }
      this.sendErrorResponse(res, error as Error);
    }
  }

  async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { limit, offset } = req.query;
      const account = await this.crudDB.readByQuery({
        "account.tag": AccountUtils.convertTag(id),
      });
      if (!account || account.length === 0) {
        this.sendErrorResponse(res, new Error("Account not found"), 404);
        return;
      }
      const history = await this.historyCrudDB.readByQuery({
        accountId: account[0]._id,
      });
      if (!history || history.length === 0) {
        this.sendErrorResponse(res, new Error("History not found"), 404);
        return;
      }
      const paginatedHistory = history
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .slice(
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
