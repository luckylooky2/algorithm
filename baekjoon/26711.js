// A+B : 수학
const [a, b] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => BigInt(v));
console.log(String(a + b));
