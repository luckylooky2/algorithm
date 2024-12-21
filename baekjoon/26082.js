// WARBOY : 수학
const [a, b, c] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
console.log((b / a) * 3 * c);
