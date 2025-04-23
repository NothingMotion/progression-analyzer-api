import { Request, Response } from "express";
import { IClub, ClubActivityStatistics } from "../types/IClub";
import { ControllerBase } from "./ControllerBase";
import CrudDBBase from "./CrudDBBase";
import { ClubActivityStatisticsModel, ClubModel } from "../models/ClubModel";
import Logger from "../lib/Logger";
import { BrawlStarsAPI } from "../constants/constants";
import { AccountUtils } from "../utils/AccountUtils";
import { BrawlStarsAPIError } from "../lib/BrawlStarsAPI";

class ClubController extends ControllerBase<IClub> {
  private crudDBStatistics: CrudDBBase<ClubActivityStatistics> =
    new CrudDBBase<ClubActivityStatistics>(ClubActivityStatisticsModel);
  constructor() {
    super(new CrudDBBase<IClub>(ClubModel));
  }

  protected override isMatch(data: any): data is IClub {
    return (
      data &&
      typeof data === "object" &&
      "tag" in data &&
      "name" in data &&
      "members" in data
    );
  }

  override async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const clubTag = AccountUtils.convertTag(id);
      Logger.log(`Fetching club with tag: ${clubTag}`);

      if (!clubTag) {
        Logger.log(`Invalid club tag: ${clubTag}`);
        this.sendErrorResponse(res, new Error("Invalid club tag"), 400);
        return;
      }

      if (!AccountUtils.isValidTag(clubTag)) {
        Logger.log(`Invalid club tag: ${clubTag}`);
        this.sendErrorResponse(res, new Error("Invalid club tag"), 400);
        return;
      }

      const parsedTag = AccountUtils.parseTag(clubTag);

      const foundClub = await this.crudDB.readByQuery({
        tag: parsedTag.replace("#", ""),
      });
      if (foundClub && foundClub.length > 0) {
        this.sendSuccessResponse(res, foundClub[0]);
        return;
      }
      Logger.log(`Fetching club from Brawl Stars API: ${parsedTag}`);
      const club = await BrawlStarsAPI.getClub(parsedTag);

      if (!club || club instanceof Error) {
        this.sendErrorResponse(res, new Error("Club not found"), 404);
        return;
      }

      // Save/update club data
      await this.crudDB.create(club);

      this.sendSuccessResponse(res, club);
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, error as Error, error.statusCode);
        return;
      }
      Logger.error(`Error fetching club: ${(error as Error).message}`);
      this.sendErrorResponse(res, error as Error);
    }
  }

  async getActivityStatistics(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const clubTag = AccountUtils.convertTag(id);

      if (!AccountUtils.isValidTag(clubTag)) {
        this.sendErrorResponse(res, new Error("Invalid club tag"), 400);
        return;
      }

      const club = await this.crudDB.readByQuery({
        tag: clubTag.replace("#", ""),
      });

      if (!club || club.length === 0) {
        this.sendErrorResponse(res, new Error("Club not found"), 404);
        return;
      }

      const memberTags = club[0].members.map((member) => member.tag);
      const parsedTag = AccountUtils.parseTag(clubTag);

      const statistics = await BrawlStarsAPI.getClubActivityStatistics(
        parsedTag,
        memberTags,
      );

      await this.crudDBStatistics.create(statistics);
      if (!statistics || statistics instanceof Error) {
        this.sendErrorResponse(
          res,
          new Error("Failed to fetch club statistics"),
          500,
        );
        return;
      }

      // Send raw response instead of using sendSuccessResponse to avoid type issues
      res.status(200).json(statistics);
    } catch (error) {
      if (error instanceof BrawlStarsAPIError) {
        this.sendErrorResponse(res, error, error.statusCode);
        return;
      }
      Logger.error(
        `Error fetching club statistics: ${(error as Error).message}`,
      );
      this.sendErrorResponse(res, error as Error);
    }
  }
}

export { ClubController };
