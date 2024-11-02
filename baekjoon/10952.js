// A+B - 5 : 구현
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const answer = [];

for (const [a, b] of input) {
  if (!a && !b) {
    break;
  }
  answer.push(a + b);
}

console.log(answer.join("\n"));
