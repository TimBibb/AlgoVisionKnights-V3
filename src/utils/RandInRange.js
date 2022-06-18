// returns a random number in the range [lo, hi)
function randInRange(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

export default randInRange;
