class APIError extends Error {
  constructor(message: string) {
    super(message);
  }

  static RateLimitExceeded(message: string) {
    return new APIError(message);
  }

  static InternalServerError(message: string) {
    return new APIError(message);
  }
}

export { APIError };
