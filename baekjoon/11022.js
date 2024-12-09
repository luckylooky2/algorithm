// A+B - 8 : 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const answer = [];

for (let i = 0; i < n; i++) {
  const [a, b] = input[i];
  answer.push(`Case #${i + 1}: ${a} + ${b} = ${a + b}`);
}

console.log(answer.join("\n"));
