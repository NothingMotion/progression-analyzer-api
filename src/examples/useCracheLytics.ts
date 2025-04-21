import axios from "axios";
import { ICrashLytics } from "../types/NotMot";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
/**
 * Example demonstrating how to send crash reports to the API
 */
async function sendCrashReport(error: Error) {
  try {
    // Example device info - in a real app, this would come from the device
    const deviceInfo = {
      appVersion: "1.0.0",
      deviceModel: "Example Device",
      deviceManufacturer: "Example Manufacturer",
      osVersion: "Android 13",
      batteryStatus: "charging",
      batteryPercentage: "85%",
      totalStorage: "128GB",
      freeStorage: "64GB",
      storagePercentage: "50%",
      totalMemoryUsage: "8GB",
      freeMemoryUsage: "4GB",
      memoryPercentage: "50%",
      networkInfo: "WiFi",
      dataSyncStatus: "synced",
      healthStatus: "good",
      userActivity: "active",
      deviceIdentity: "example-device-id",
    };

    // Prepare crash report
    const crashReport: ICrashLytics = {
      uuid: uuidv4(),
      timestamp: new Date(),
      type: error.name,
      throwable: error.stack,
      message: error.message,
      stackTrace: error.stack || "No stack trace available",
      deviceInfo,
    };

    const token = jwt.sign({ userId: "1234" }, "VERYSECURESECRET1234");
    // Send crash report to the API
    // Note: In a real implementation, you would get the base URL and token from configuration
    const response = await axios.post(
      "http://localhost:3000/api/v1/notmot/crashlytics",
      crashReport,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Crash report sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send crash report:", error);
  }
}

// Example usage
async function demonstrateCrashReport() {
  try {
    // Simulate an error
    throw new Error("Example error for crash reporting");
  } catch (error) {
    if (error instanceof Error) {
      await sendCrashReport(error);
    }
  }
}

// Run the demo
demonstrateCrashReport();

export { sendCrashReport, demonstrateCrashReport };
