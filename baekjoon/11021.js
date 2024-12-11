// A+B - 7 : 구현
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const cases = input;
const answer = [];

for (let i = 0; i < n; i++) {
  const [a, b] = cases[i];
  answer.push(`Case #${i + 1}: ${a + b}`);
}

console.log(answer.join("\n"));
