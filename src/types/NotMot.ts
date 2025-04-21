interface INotMot {
  id: number;
  name: string;
  version: number;
  versionString: string;
  isReleased: boolean;
  forceUpdate: boolean;
  updateDescription: string;
  url: string;
}

interface IDeviceInfo {
  appVersion: string;
  deviceModel: string;
  deviceManufacturer: string;
  osVersion: string;
  batteryStatus: string;
  batteryPercentage: string;
  totalStorage: string;
  freeStorage: string;
  storagePercentage: string;
  totalMemoryUsage: string;
  freeMemoryUsage: string;
  memoryPercentage: string;
  networkInfo: string;
  dataSyncStatus: string;
  healthStatus: string;
  userActivity: string;
  deviceIdentity: string;
}
interface ICrashLytics {
  uuid: string;
  timestamp: Date;
  type: string;
  throwable?: string;
  message: string;
  stackTrace: string;
  deviceInfo: IDeviceInfo;
}
export { INotMot, ICrashLytics };
