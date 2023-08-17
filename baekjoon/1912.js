// 연속합 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const n = input.shift()[0];
const [arr] = input;

const dp = new Array(n).fill(0);
let answer = -Infinity;

for (let i = 0; i < n; i++) {
  let max = i === 0 ? -Infinity : dp[i - 1];
  dp[i] = Math.max(max + arr[i], arr[i]);
  answer = Math.max(dp[i], answer);
}

console.log(answer);
