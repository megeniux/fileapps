export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function estimateSizeMB(durationSeconds: number, crf: number){
  // Approx average bitrate in kbps based on CRF
  const bitrateByCrf: { [key: number]: number } = {
    18: 4000,
    19: 3500,
    20: 3000,
    21: 2500,
    22: 2000,
    23: 1500,
    24: 1300,
    25: 1100,
    26: 900,
    27: 750,
    28: 600,
    29: 500,
    30: 400,
    31: 300,
    32: 250,
    33: 200,
    34: 150,
    35: 100,
    36: 80
  };
  const bitrateKbps = bitrateByCrf[crf] ?? 1500;
  const sizeMB = (bitrateKbps * durationSeconds) / 8 / 1024;
  return sizeMB.toFixed(1); // e.g., "12.5"
};
