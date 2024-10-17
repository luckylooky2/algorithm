// X보다 작은 수 : 구현
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, x] = input.shift();
const arr = input.shift();
const answer = [];

for (const elem of arr) {
  if (elem < x) {
    answer.push(elem);
  }
}

console.log(answer.join(" "));
