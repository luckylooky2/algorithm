// 퇴사 : 동적 계획법, 브루트 포스
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const n = arr.shift()[0];
const dp = new Array(n + 2).fill(0);
let max = 0;

for (let i = 1; i <= n; i++) {
  const workDays = arr[i - 1][0];
  const pay = arr[i - 1][1];
  dp[i] = Math.max(dp[i - 1], dp[i]);
  max = Math.max(dp[i], max);
  if (i + workDays <= n + 1)
    dp[i + workDays] = Math.max(dp[i] + pay, dp[i + workDays]);
}

console.log(Math.max(dp[n + 1], max));
