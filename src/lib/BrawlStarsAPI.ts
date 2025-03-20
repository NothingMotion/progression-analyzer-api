import axios, { AxiosError } from "axios";
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
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = "https://api.brawlapi.com/v1";
    this.apiKey = process.env.BRAWL_STARS_API_KEY || "";
  }

  async get(tag: string): Promise<object | BrawlStarsAPIError> {
    try {
      const response = await axios.get(`${this.baseUrl}/account/${tag}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
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
