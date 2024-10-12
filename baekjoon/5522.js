// 카드 게임 : 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
console.log(input.reduce((acc, curr) => acc + curr, 0));
