// 긴자리 계산 : 수학
const [a, b] = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => BigInt(v));
const answer = [a + b, a - b, a * b];

console.log(answer.join("\n"));
