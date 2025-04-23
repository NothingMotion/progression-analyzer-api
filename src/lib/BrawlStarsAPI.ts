import axios, { AxiosError, AxiosProxyConfig } from "axios";
import { IAPIAccount, IBrawler, IExtraBrawlNinja } from "../types/IAccount";
import { BrawlStarsAPIError } from "../errors/BrawlStarsAPIError";
import Logger from "./Logger";
import { Battle } from "../types/IBattle";
import { ClubActivityStatistics, IClub } from "../types/IClub";

interface IBrawlStarsAPI {
  get(tag: string): Promise<IAPIAccount>;
  getExtra(tag: string): Promise<IExtraBrawlNinja>;
  getBattleLog(tag: string): Promise<Battle[]>;
  getClub(clubTag: string): Promise<IClub>;

  getClubActivityStatistics(
    clubTag: string,
    membersTag: string[],
  ): Promise<ClubActivityStatistics>;
}
class BrawlStarsAPI implements IBrawlStarsAPI {
  private readonly baseUrl: string;
  private readonly baseUrlAlternative: string;
  private readonly apiKey: string;

  constructor(
    baseUrl = "https://api.brawlstars.com/v1",
    baseUrlAlternative = "https://brawltime.ninja/api/",
    apiKey = "",
  ) {
    this.baseUrl = baseUrl;
    this.baseUrlAlternative = baseUrlAlternative;

    // Only validate API key if we're using the official API
    if (baseUrl.includes("api.brawlstars.com") && !apiKey) {
      Logger.log("Warning: No API key provided for official Brawl Stars API");
    }

    this.apiKey = apiKey;
  }
  async getBattleLog(tag: string): Promise<Battle[]> {
    try {
      // Use the exact same URL format as the working curl command
      const url = `${this.baseUrlAlternative}player.byTag?input=%7B%22json%22%3A%22${tag}%22%7D`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.43.3",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        timeout: 4000,
        proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
      });
      return response.data.result.data.json.battles as Battle[];
    } catch (error) {
      console.error(error);
      if (error instanceof BrawlStarsAPIError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            throw BrawlStarsAPIError.InvalidTag(
              error.response?.data.message || "Invalid tag",
            );
          case 401:
            throw BrawlStarsAPIError.Unauthorized(
              error.response?.data.message || "Unauthorized",
            );
          case 403:
            throw BrawlStarsAPIError.Forbidden(
              error.response?.data.message || "Forbidden",
            );
          case 404:
            throw BrawlStarsAPIError.AccountNotFound(
              error.response?.data.message || "Account not found",
            );
          case 429:
            throw BrawlStarsAPIError.RateLimitExceeded(
              error.response?.data.message || "Rate limit exceeded",
            );
          case 500:
            throw BrawlStarsAPIError.InternalServerError(
              error.response?.data.message || "Internal server error",
            );
          case 503:
            throw BrawlStarsAPIError.ServiceUnavailable(
              error.response?.data.message || "Service unavailable",
            );
          default:
            throw BrawlStarsAPIError.InternalServerError(
              "Unknown error occurred",
            );
        }
      }

      Logger.log(`Error fetching account: ${error}`);
      throw BrawlStarsAPIError.InternalServerError("Internal server error");
    }
  }

  async getClub(clubTag: string): Promise<IClub> {
    try {
      // Use the exact same URL format as the working curl command
      const url = `${this.baseUrlAlternative}club.byTag?input=%7B%22json%22%3A%22${clubTag}%22%7D`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.43.3",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        timeout: 4000,
        proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
      });
      return response.data.result.data.json as IClub;
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            throw BrawlStarsAPIError.InvalidTag(
              error.response?.data.message || "Invalid tag",
            );
          case 401:
            throw BrawlStarsAPIError.Unauthorized(
              error.response?.data.message || "Unauthorized",
            );
          case 403:
            throw BrawlStarsAPIError.Forbidden(
              error.response?.data.message || "Forbidden",
            );
          case 404:
            throw BrawlStarsAPIError.AccountNotFound(
              error.response?.data.message || "Account not found",
            );
          case 429:
            throw BrawlStarsAPIError.RateLimitExceeded(
              error.response?.data.message || "Rate limit exceeded",
            );
          case 500:
            throw BrawlStarsAPIError.InternalServerError(
              error.response?.data.message || "Internal server error",
            );
          case 503:
            throw BrawlStarsAPIError.ServiceUnavailable(
              error.response?.data.message || "Service unavailable",
            );
          default:
            throw BrawlStarsAPIError.InternalServerError(
              "Unknown error occurred",
            );
        }
      }

      Logger.log(`Error fetching account: ${error}`);
      throw BrawlStarsAPIError.InternalServerError("Internal server error");
    }
  }
  async getClubActivityStatistics(
    clubTag: string,
    membersTag: string[],
  ): Promise<ClubActivityStatistics> {
    try {
      // Use the exact same URL format as the working curl command
      const url = `${
        this.baseUrlAlternative
      }club.activityStatisticsByTags?input={"json":[${membersTag
        .map((tag) => `"${tag}"`)
        .join(",")}]}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.43.3",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        timeout: 4000,
        proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
      });
      return response.data.result.data.json as ClubActivityStatistics;
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            throw BrawlStarsAPIError.InvalidTag(
              error.response?.data.message || "Invalid tag",
            );
          case 401:
            throw BrawlStarsAPIError.Unauthorized(
              error.response?.data.message || "Unauthorized",
            );
          case 403:
            throw BrawlStarsAPIError.Forbidden(
              error.response?.data.message || "Forbidden",
            );
          case 404:
            throw BrawlStarsAPIError.AccountNotFound(
              error.response?.data.message || "Account not found",
            );
          case 429:
            throw BrawlStarsAPIError.RateLimitExceeded(
              error.response?.data.message || "Rate limit exceeded",
            );
          case 500:
            throw BrawlStarsAPIError.InternalServerError(
              error.response?.data.message || "Internal server error",
            );
          case 503:
            throw BrawlStarsAPIError.ServiceUnavailable(
              error.response?.data.message || "Service unavailable",
            );
          default:
            throw BrawlStarsAPIError.InternalServerError(
              "Unknown error occurred",
            );
        }
      }

      Logger.log(`Error fetching account: ${error}`);
      throw BrawlStarsAPIError.InternalServerError("Internal server error");
    }
  }

  async get(tag: string): Promise<IAPIAccount> {
    try {
      // Use the exact same URL format as the working curl command
      const url = `${this.baseUrlAlternative}player.byTag?input=%7B%22json%22%3A%22${tag}%22%7D`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.43.3",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        timeout: 4000,
        proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
      });

      const data = response.data.result.data.json;
      if (!data) {
        throw BrawlStarsAPIError.AccountNotFound(
          "Account data not found in response",
        );
      }

      // Create a new clean object without unwanted properties
      const cleanedData = { ...data };

      // Process brawlers - convert from object to array
      const brawlersArray: IBrawler[] = [];
      if (cleanedData.brawlers && typeof cleanedData.brawlers === "object") {
        for (const key of Object.keys(cleanedData.brawlers)) {
          const brawler = cleanedData.brawlers[key];
          if (brawler && typeof brawler === "object") {
            brawlersArray.push(brawler as IBrawler);
          }
        }
      }

      if (
        brawlersArray.length === 0 &&
        Object.keys(cleanedData.brawlers || {}).length > 0
      ) {
        Logger.log(`Warning: Failed to parse brawlers data for tag ${tag}`);
      }

      // Remove unwanted properties
      const { battles, meta, ...accountData } = cleanedData;

      // Replace brawlers object with array
      accountData.brawlers = brawlersArray;
      console.log(accountData);
      return accountData as IAPIAccount;
    } catch (error) {
      console.error(error);
      if (error instanceof BrawlStarsAPIError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            throw BrawlStarsAPIError.InvalidTag(
              error.response?.data.message || "Invalid tag",
            );
          case 401:
            throw BrawlStarsAPIError.Unauthorized(
              error.response?.data.message || "Unauthorized",
            );
          case 403:
            throw BrawlStarsAPIError.Forbidden(
              error.response?.data.message || "Forbidden",
            );
          case 404:
            throw BrawlStarsAPIError.AccountNotFound(
              error.response?.data.message || "Account not found",
            );
          case 429:
            throw BrawlStarsAPIError.RateLimitExceeded(
              error.response?.data.message || "Rate limit exceeded",
            );
          case 500:
            throw BrawlStarsAPIError.InternalServerError(
              error.response?.data.message || "Internal server error",
            );
          case 503:
            throw BrawlStarsAPIError.ServiceUnavailable(
              error.response?.data.message || "Service unavailable",
            );
          default:
            throw BrawlStarsAPIError.InternalServerError(
              "Unknown error occurred",
            );
        }
      }

      Logger.log(`Error fetching account: ${error}`);
      throw BrawlStarsAPIError.InternalServerError("Internal server error");
    }
  }

  async getExtra(tag: string): Promise<IExtraBrawlNinja> {
    try {
      // Use the exact same URL format as the working get method
      const url = `${this.baseUrlAlternative}player.byTagExtra?input=%7B%22json%22%3A%22${tag}%22%7D`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        timeout: 4000,
        proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
      });

      if (!response.data || !response.data.result) {
        throw BrawlStarsAPIError.AccountNotFound(
          "Extra account data not found",
        );
      }

      return response.data as IExtraBrawlNinja;
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw BrawlStarsAPIError.InternalServerError(
          error.response?.data?.message || "Error fetching extra data",
        );
      }

      Logger.log(`Error fetching extra account data: ${error}`);
      throw BrawlStarsAPIError.InternalServerError("Internal server error");
    }
  }
  private shouldUseProxy(): boolean {
    const shouldUse = process.env.USE_PROXY === "true";
    Logger.log(shouldUse ? "Using proxy" : "Not using proxy"); //
    return shouldUse;
  }

  private getProxyConfig(): AxiosProxyConfig {
    const proxyConfig = {
      host: process.env.PROXY_URL || "",
      port: parseInt(process.env.PROXY_PORT || "8080"),
      auth: {
        username: process.env.PROXY_USERNAME || "",
        password: process.env.PROXY_PASSWORD || "",
      },
      protocol: process.env.PROXY_TYPE || "http",
    };
    // console.log(proxyConfig);
    return proxyConfig;
  }
}

export default BrawlStarsAPI;
export { BrawlStarsAPIError };
