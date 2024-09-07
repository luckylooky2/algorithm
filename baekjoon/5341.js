// Pyramids : 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
const answer = [];

for (const elem of input) {
  if (elem === 0) {
    break;
  }
  answer.push((elem * (elem + 1)) / 2);
}

console.log(answer.join("\n"));
