import { ACCOUNT_TAG_REGEX, BrawlStarsAPI } from "../constants/constants";
import { BrawlStarsAPIError } from "../lib/BrawlStarsAPI";
import { AccountModel, HistoryModel } from "../models/AccountModel";
import { IAPIAccountToBrawlStarsAccount } from "../models/mappers/IAPIAccountToBrawlStarsAccount";
import { BrawlStarsAccount } from "../types/IAccount";
import { AccountCalculator } from "./AccountCalculator";

class AccountUtils {
  static isValidTag(tag: string): boolean {
    return ACCOUNT_TAG_REGEX.test(tag);
  }
  static parseTag(tag: string): string {
    return tag
      .replace("#", "")
      .trim()
      .replace(" ", "")
      .replace(/O/gi, "0")
      .toUpperCase();
  }

  static convertTag(tag: string): string {
    return tag.includes("#")
      ? tag.toUpperCase().replace(" ", "").replace(/O/gi, "0")
      : "#" + tag.toUpperCase().replace(" ", "").replace(/O/gi, "0");
  }
  static async getAccount(tag: string): Promise<BrawlStarsAccount> {
    try {
      const account = await BrawlStarsAPI.get(tag);
      const extra = await BrawlStarsAPI.getExtra(tag);
      const mapper = new IAPIAccountToBrawlStarsAccount();

      if (account instanceof Error) throw account;

      const bsAccount = mapper.map(account);

      // step 2: calculating the progress
      const cProgress = AccountCalculator.calculateCurrentProgress(
        bsAccount,
        false,
        false,
        false,
      );
      bsAccount.currentProgress = cProgress;
      bsAccount.account.rank = {};
      bsAccount.account.highestRank = {};
      if (!(extra instanceof Error)) {
        const result = extra.result.data.json;
        if (result) {
          bsAccount.account.rank = result.rank;
          bsAccount.account.highestRank = result.highestRank;
          if (result.brawlers) {
            for (const key of Object.keys(result.brawlers)) {
              const brawler = bsAccount.account.brawlers.find(
                (b) => b.name === this.parseExtraBrawlerName(key),
              );
              if (brawler) {
                brawler.masteryPoints = result.brawlers[key].masteryPoints;
              }
            }
          }
        }
      }
      // step 3: calculating the future progress

      // step 4: calculating the previous progress
      //
      return bsAccount;
    } catch (error) {
      throw error;
    }
  }

  static async updateAccount(tag: string): Promise<BrawlStarsAccount> {
    try {
      const savedAccount = await AccountModel.findOne({
        "account.tag": tag,
      });
      if (!savedAccount) {
        throw BrawlStarsAPIError.AccountNotFound("Account not found");
      }
      const parsedTag = AccountUtils.parseTag(tag);
      const account = await BrawlStarsAPI.get(parsedTag);
      const extra = await BrawlStarsAPI.getExtra(parsedTag);
      if (account instanceof Error || !account) throw account;

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

      // Initialize history array if it doesn't exist
      if (!savedAccount.history) {
        savedAccount.history = [];
      }

      // Create a history entry with the required fields
      const historyEntry = {
        accountId: savedAccount._id,
        name: savedAccount.account.name,
        // Include other required fields from the savedAccount
        expLevel: savedAccount.account.expLevel || 0,
        expPoints: savedAccount.account.expPoints || 0,
        trophies: savedAccount.account.trophies || 0,
        highestTrophies: savedAccount.account.highestTrophies || 0,
        soloVictories: savedAccount.account.soloVictories || 0,
        duoVictories: savedAccount.account.duoVictories || 0,
        trioVictories: savedAccount.account.trioVictories || 0,
        bestRoboRumbleTime: savedAccount.account.bestRoboRumbleTime || 0,
        bestTimeAsBigBrawler: savedAccount.account.bestTimeAsBigBrawler || 0,
        brawlers: savedAccount.account.brawlers || [],
        club: savedAccount.account.club || {},
        rank: savedAccount.account.rank || {},
        highestRank: savedAccount.account.highestRank || {},
        icon: savedAccount.account.icon || {},
      };

      // Save the history entry
      const history = await HistoryModel.create(historyEntry);
      // savedAccount.history.push(history);
      savedAccount.account = mappedNewData.account;

      // Initialize previousProgresses array if it doesn't exist
      if (!savedAccount.previousProgresses) {
        savedAccount.previousProgresses = [];
      }

      if (savedAccount.currentProgress) {
        savedAccount.previousProgresses.push(savedAccount.currentProgress);
      }

      const cProgress = AccountCalculator.calculateCurrentProgress(
        mappedNewData,
        false,
        false,
        false,
      );
      savedAccount.currentProgress = cProgress;

      if (!(extra instanceof Error)) {
        const result = extra.result.data.json;
        if (result) {
          savedAccount.account.rank = result.rank;
          savedAccount.account.highestRank = result.highestRank;

          if (result.brawlers) {
            for (const key of Object.keys(result.brawlers)) {
              const brawler = savedAccount.account.brawlers.find(
                (b) => b.name === this.parseExtraBrawlerName(key),
              );
              if (brawler && result.brawlers) {
                brawler.masteryPoints = result.brawlers[key].masteryPoints;
              }
            }
          }
        }
      }
      await savedAccount.save();
      return savedAccount;
    } catch (error) {
      throw error;
    }
  }

  static parseExtraBrawlerName(name: string): string {
    return name
      .replace("__", " ")
      .replace(" ", "")
      .replace("-", "")
      .replace("_", "")
      .toUpperCase();
  }
}

export { AccountUtils };
