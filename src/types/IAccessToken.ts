interface IToken {
  token: string;
  expiresAt: Date;
}
interface IAccessToken extends IToken {}
interface IRefreshToken extends IToken {}
interface IAccessTokenResponse {
  accessToken: IAccessToken;
  refreshToken: IRefreshToken;
}
export { IAccessToken, IRefreshToken, IAccessTokenResponse, IToken };
