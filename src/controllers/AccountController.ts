import { BrawlStarsAccount, IAccount } from "../types/IAccount";
import { ControllerBase } from "./ControllerBase";

class AccountController extends ControllerBase<BrawlStarsAccount> {
  override isMatch(data: any): data is BrawlStarsAccount {
    return data && typeof data === "object" && "account" in data;
  }
}
export { AccountController };
