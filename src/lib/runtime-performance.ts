interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
}

export interface RuntimePerformanceProfile {
  hardwareConcurrency: number;
  deviceMemory: number | null;
  isLowEndDevice: boolean;
  batchConcurrency: number;
  defaultPdfScale: number;
  maxRecommendedPdfScale: number;
}

export interface MediaPerformanceGuidance {
  largeFileWarningThresholdBytes: number;
  reverseWarningThresholdBytes: number;
  recommendedGifFps: string;
  recommendedGifWidth: string;
}

export function getRuntimePerformanceProfile(): RuntimePerformanceProfile {
  if (typeof navigator === "undefined") {
    return {
      hardwareConcurrency: 4,
      deviceMemory: null,
      isLowEndDevice: false,
      batchConcurrency: 2,
      defaultPdfScale: 2,
      maxRecommendedPdfScale: 4,
    };
  }

  const nav = navigator as NavigatorWithDeviceMemory;
  const hardwareConcurrency = nav.hardwareConcurrency ?? 4;
  const deviceMemory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : null;
  const isLowEndDevice = hardwareConcurrency <= 4 || (deviceMemory !== null && deviceMemory <= 4);
  const isHighEndDevice = hardwareConcurrency >= 10 || (deviceMemory !== null && deviceMemory >= 8);

  return {
    hardwareConcurrency,
    deviceMemory,
    isLowEndDevice,
    batchConcurrency: isLowEndDevice ? 1 : isHighEndDevice ? 3 : 2,
    defaultPdfScale: isLowEndDevice ? 1 : 2,
    maxRecommendedPdfScale: isLowEndDevice ? 2 : 4,
  };
}

export function getMediaPerformanceGuidance(
  profile: RuntimePerformanceProfile,
): MediaPerformanceGuidance {
  if (profile.isLowEndDevice) {
    return {
      largeFileWarningThresholdBytes: 120 * 1024 * 1024,
      reverseWarningThresholdBytes: 150 * 1024 * 1024,
      recommendedGifFps: "8",
      recommendedGifWidth: "360",
    };
  }

  if (profile.batchConcurrency >= 3) {
    return {
      largeFileWarningThresholdBytes: 300 * 1024 * 1024,
      reverseWarningThresholdBytes: 400 * 1024 * 1024,
      recommendedGifFps: "12",
      recommendedGifWidth: "480",
    };
  }

  return {
    largeFileWarningThresholdBytes: 200 * 1024 * 1024,
    reverseWarningThresholdBytes: 250 * 1024 * 1024,
    recommendedGifFps: "10",
    recommendedGifWidth: "480",
  };
}
