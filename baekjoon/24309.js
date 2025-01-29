// РАВЕНСТВО : 수학
const [a, b, c] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => BigInt(v));
console.log(((b - c) / a).toString());
