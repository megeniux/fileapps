export const parseDuration = (msg: string): number => {
  const match = msg.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return 0;
};

export const parseCurrentTime = (msg: string): number | null => {
  const match = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return null;
};
