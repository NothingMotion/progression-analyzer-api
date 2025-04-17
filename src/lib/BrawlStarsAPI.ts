import axios, { AxiosError, AxiosProxyConfig } from "axios";
import { IAPIAccount, IExtraBrawlNinja } from "../types/IAccount";
import { BrawlStarsAPIError } from "../errors/BrawlStarsAPIError";
import Logger from "./Logger";
enum BrawlStarsAPIError2 {
  InvalidTag = "Invalid tag",
  Unauthorized = "Unauthorized",
  Forbidden = "Forbidden",
  AccountNotFound = "Account not found",
  RateLimitExceeded = "Rate limit exceeded",
  InternalServerError = "Internal server error",
  ServiceUnavailable = "Service unavailable",
}
class BrawlStarsAPI {
  constructor(
    private readonly baseUrl: string = "https://api.brawlstars.com/v1",
    private readonly baseUrlExtra: string = "https://brawltime.ninja/api/player.byTagExtra?",
    private readonly apiKey: string,
  ) {
    this.baseUrl = baseUrl;
    // if (!apiKey) throw new Error("API key is required");
    this.apiKey = apiKey;
  }

  async get(tag: string): Promise<IAPIAccount | BrawlStarsAPIError> {
    try {
      const response = await axios.get(`${this.baseUrl}/players/%23${tag}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=600",
        },
        proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
      });
      return response.data as IAPIAccount;
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            throw BrawlStarsAPIError.InvalidTag(error.response?.data.message);
          case 401:
            throw BrawlStarsAPIError.Unauthorized(error.response?.data.message);
          case 403:
            throw BrawlStarsAPIError.Forbidden(error.response?.data.message);
          case 404:
            throw BrawlStarsAPIError.AccountNotFound(
              error.response?.data.message,
            );
          case 429:
            throw BrawlStarsAPIError.RateLimitExceeded(
              error.response?.data.message,
            );
          case 500:
            throw BrawlStarsAPIError.InternalServerError(
              error.response?.data.message,
            );
          case 503:
            throw BrawlStarsAPIError.ServiceUnavailable(
              error.response?.data.message,
            );
          default:
            throw error;
        }
      }

      console.error("Error fetching account:", error);
      throw BrawlStarsAPIError.InternalServerError("Internal server error");
    }
  }

  async getExtra(tag: string): Promise<IExtraBrawlNinja | BrawlStarsAPIError> {
    try {
      // https://brawltime.ninja/api/player.byTagExtra?input=%7B%22json%22%3A%22VLQPVPY%22%7D
      const response = await axios.get(
        `${this.baseUrlExtra}input=%7B%22json%22%3A%22${tag}%22%7D`,
      );
      return response.data as IExtraBrawlNinja;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw BrawlStarsAPIError.InternalServerError(
          error.response?.data.message,
        );
      }
      throw error;
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
