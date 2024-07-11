// 수열 : 누적 합, 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, k] = input.shift();
const temperatures = input.shift();
let prefixSum = new Array(n + 1).fill(0);
let answer = -Infinity;

for (let i = 1; i <= temperatures.length; i++) {
  prefixSum[i] = prefixSum[i - 1] + temperatures[i - 1];
}

for (let i = k; i < prefixSum.length; i++) {
  answer = Math.max(answer, prefixSum[i] - prefixSum[i - k]);
}

console.log(answer);
