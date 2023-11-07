// 보물 : 그리디
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = arr.shift();
const sorted1 = arr[0].sort((a, b) => b - a);
const sorted2 = arr[1].sort((a, b) => a - b);
let total = 0;
for (let i = 0; i < sorted1.length; i++) total += sorted1[i] * sorted2[i];

console.log(total);
