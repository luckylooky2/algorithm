// Shares : 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const answer = [];

for (const [n, s] of input) {
  answer.push(Math.floor(s / (n + 1)));
}

console.log(answer.join("\n"));
