import { Schema, model } from "mongoose";
import { ICrashLytics } from "../types/NotMot";

const deviceInfoSchema = new Schema({
  appVersion: { type: String, required: true },
  deviceModel: { type: String, required: true },
  deviceManufacturer: { type: String, required: true },
  osVersion: { type: String, required: true },
  batteryStatus: { type: String, required: true },
  batteryPercentage: { type: String, required: true },
  totalStorage: { type: String, required: true },
  freeStorage: { type: String, required: true },
  storagePercentage: { type: String, required: true },
  totalMemoryUsage: { type: String, required: true },
  freeMemoryUsage: { type: String, required: true },
  memoryPercentage: { type: String, required: true },
  networkInfo: { type: String, required: true },
  dataSyncStatus: { type: String, required: true },
  healthStatus: { type: String, required: true },
  userActivity: { type: String, required: true },
  deviceIdentity: { type: String, required: true },
});

const crashLyticsSchema = new Schema<ICrashLytics>(
  {
    uuid: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    type: { type: String, required: true },
    throwable: { type: String, required: false },
    message: { type: String, required: true },
    stackTrace: { type: String, required: true },
    deviceInfo: { type: deviceInfoSchema, required: true },
  },
  { timestamps: true },
);

const CrashLyticsModel = model<ICrashLytics>("CrashLytics", crashLyticsSchema);

export { CrashLyticsModel };
