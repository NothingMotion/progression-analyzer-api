import axios, { AxiosError } from "axios";
import { IAPIAccount } from "../models/IAccount";
enum BrawlStarsAPIError {
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
    private readonly apiKey: string,
  ) {
    this.baseUrl = baseUrl;
    if (!apiKey) throw new Error("API key is required");
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
      });
      return response.data as IAPIAccount;
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            throw new Error(BrawlStarsAPIError.InvalidTag);
          case 401:
            throw new Error(BrawlStarsAPIError.Unauthorized);
          case 403:
            throw new Error(BrawlStarsAPIError.Forbidden);
          case 404:
            throw new Error(BrawlStarsAPIError.AccountNotFound);
          case 429:
            throw new Error(BrawlStarsAPIError.RateLimitExceeded);
          case 500:
            throw new Error(BrawlStarsAPIError.InternalServerError);
          case 503:
            throw new Error(BrawlStarsAPIError.ServiceUnavailable);
          default:
            throw error;
        }
      }

      console.error("Error fetching account:", error);
      throw error;
    }
  }
}

export default BrawlStarsAPI;
