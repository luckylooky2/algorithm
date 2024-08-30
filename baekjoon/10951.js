// A + B - 4
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const answer = [];

for (const [a, b] of input) {
  answer.push(a + b);
}

console.log(answer.join("\n"));
