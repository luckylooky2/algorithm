// 로프 : 그리디, 정렬
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = arr.shift();
const result = [];
let answer = -Infinity;
const sorted = arr.sort((a, b) => a - b);
let i = 0;

for (value of sorted) {
  const totalWeight = value * (n - i);
  result.push(totalWeight);
  answer = Math.max(answer, totalWeight);
  i++;
}

console.log(answer);
