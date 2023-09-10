// 합분해 : 동적 계획법
const [n, k] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));
const dp = new Array(k).fill(null).map(() => new Array(n + 1).fill(1));

for (let i = 1; i < k; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000000;
  }
}

console.log(dp[k - 1][n]);
