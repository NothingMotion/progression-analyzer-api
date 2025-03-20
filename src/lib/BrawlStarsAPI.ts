import axios, { AxiosError } from "axios";
import { IAPIAccount } from "../types/IAccount";
import { BrawlStarsAPIError } from "../errors/BrawlStarsAPIError";
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
}

export default BrawlStarsAPI;
export { BrawlStarsAPIError };
