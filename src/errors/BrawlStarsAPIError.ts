class BrawlStarsAPIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static InvalidTag(message: string) {
    return new BrawlStarsAPIError(message, 400);
  }
  static Unauthorized(message: string) {
    return new BrawlStarsAPIError(message, 401);
  }

  static Forbidden(message: string) {
    return new BrawlStarsAPIError(message, 403);
  }

  static AccountNotFound(message: string) {
    return new BrawlStarsAPIError(message, 404);
  }
  static RateLimitExceeded(message: string) {
    return new BrawlStarsAPIError(message, 429);
  }

  static InternalServerError(message: string) {
    return new BrawlStarsAPIError(message, 500);
  }

  static ServiceUnavailable(message: string) {
    return new BrawlStarsAPIError(message, 503);
  }
}

export { BrawlStarsAPIError };
