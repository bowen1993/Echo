export const rateFunc = (up, down) => {
  const n = up + down;
  let score = 0;
  if (n !== 0) {
    const z = 1.96;
    const phat = up / n;
    score = (phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n);
  }
  return score;
};