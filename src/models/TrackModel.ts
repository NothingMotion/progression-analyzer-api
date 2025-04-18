import { Schema, model } from "mongoose";
import { ITrack } from "../types/ITrack";

const trackSchema: Schema<ITrack> = new Schema({
  uuid: {
    type: String,
    required: true,
    // unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  joinedSince: {
    type: Date,
    required: true,
  },
  version: {
    type: Number,
    required: false,
  },
  versionString: {
    type: String,
    required: false,
  },
});

const TrackModel = model<ITrack>("Track", trackSchema);

export { TrackModel };
