// 라면 공식 : 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const ramens = input;
const answer = [];

for (const [specialRatio, waterPerRamen, ramenCount] of ramens) {
  answer.push(specialRatio * (ramenCount - 1) + waterPerRamen);
}

console.log(answer.join("\n"));
