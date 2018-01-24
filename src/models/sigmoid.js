module.exports = (max) => {
  const c = 1;
  return x => (max / (1 + Math.exp(-x * c)) - max / 2) * 2;
};
