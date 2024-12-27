// 三方比較 (Three-Way Comparison) : 수학
const [a, b] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
console.log(Math.sign(a - b));
