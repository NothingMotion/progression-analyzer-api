import { Schema, model } from "mongoose";
import { IClub, ClubMember, ClubActivityStatistics } from "../types/IClub";

const clubMemberSchema = new Schema<ClubMember>({
  tag: { type: String, required: true },
  name: { type: String, required: true, default: "" },
  nameColor: { type: String, required: true, default: "#000000" },
  trophies: { type: Number, required: true, default: 0 },
  role: { type: String, required: true, default: "member" },
  icon: {
    id: { type: Number, required: true, default: 0 },
  },
});

const clubSchema = new Schema<IClub>(
  {
    tag: { type: String, required: true, unique: true },
    name: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    type: { type: String, required: false },
    badgeId: { type: String, required: false },
    requiredTrophies: { type: Number, required: true, default: 0 },
    trophies: { type: Number, required: true, default: 0 },
    members: [clubMemberSchema],
  },
  { timestamps: true },
);

// Add compound index for members.tag to be unique within a club
clubSchema.index({ "members.tag": 1, tag: 1 }, { unique: true });

const clubActivityStatisticsSchema = new Schema({
  lastActive: {
    type: Map,
    of: Date,
    default: {},
  },
  commonBattles: {
    type: [Schema.Types.Mixed],
    default: [],
  },
  battlesByMode: {
    type: Map,
    of: Number,
    default: {},
  },
});

const ClubActivityStatisticsModel = model<ClubActivityStatistics>(
  "ClubActivityStatistics",
  clubActivityStatisticsSchema,
);
const ClubModel = model<IClub>("Club", clubSchema);

export { ClubModel, ClubActivityStatisticsModel };
