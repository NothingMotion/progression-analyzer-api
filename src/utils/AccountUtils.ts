import { ACCOUNT_TAG_REGEX, BrawlStarsAPI } from "../constants/constants";
import { AccountModel } from "../models/AccountModel";
import { BrawlStarsAccount } from "../types/IAccount";

class AccountUtils {
  static isValidTag(tag: string): boolean {
    return ACCOUNT_TAG_REGEX.test(tag);
  }
  static parseTag(tag: string): string {
    return tag.replace("#", "").trim().toUpperCase();
  }

  static async getAccount(tag: string): Promise<BrawlStarsAccount | Error> {
    try {
      const account = await BrawlStarsAPI.get(tag);
      const mapper = new IAPIAccountToBrawlStarsAccount();

      // step 2: calculating the progress

      // step 3: calculating the future progress

      // step 4: calculating the previous progress
      //
      return mapper.map(account);
    } catch (error) {
      throw error;
    }
  }

  static async updateAccount(tag: string): Promise<BrawlStarsAccount | Error> {
    try {
      const savedAccount = await AccountModel.findOne({
        "account.tag": tag,
      });
      if (!savedAccount) {
        throw new Error("Account not found");
      }
      const account = await B rawlStarsAPI.get(tag);
      const mapper = new IAPIAccountToBrawlStarsAccount();
      const mappedNewData = mapper.map(
        account,
        savedAccount.currentProgress,
        savedAccount.futureProgresses,
        savedAccount.previousProgresses,
        savedAccount.history,
        savedAccount.createdAt,
        savedAccount.updatedAt,
      );
      savedAccount.history.push(savedAccount);
      savedAccount.account = mappedNewData.account;
      await savedAccount.save();
      return savedAccount;
    } catch (error) {
      throw error;
    }
  }
}

export { AccountUtils };
