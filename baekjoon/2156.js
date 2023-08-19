// 포도주 시식 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const n = arr.shift();
const dp = new Array(n + 1).fill(null).map(() => new Array(3).fill(0));
dp[1][0] = arr[0];
dp[1][1] = arr[0];
let max = arr[0];

for (let i = 2; i <= n; i++) {
  dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][2]) + arr[i - 1];

  dp[i][1] = Math.max(dp[i - 2][0], dp[i - 2][1], dp[i - 2][2]) + arr[i - 1];
  dp[i][2] =
    i === 2
      ? 0
      : Math.max(dp[i - 3][0], dp[i - 3][1], dp[i - 3][2]) + arr[i - 1];
  max = Math.max(dp[i][0], dp[i][1], dp[i][2], max);
}

console.log(max);
