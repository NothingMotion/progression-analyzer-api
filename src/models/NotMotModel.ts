import { Schema, model } from "mongoose";
import { INotMot } from "../types/NotMot";

const notmotSchema = new Schema<INotMot>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  versionString: {
    type: String,
    required: true,
  },
  isReleased: {
    type: Boolean,
    required: true,
  },
  forceUpdate: {
    type: Boolean,
    required: true,
    default: false,
  },
  updateDescription: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const NotMotModel = model<INotMot>("NotMot", notmotSchema);

export { NotMotModel };
