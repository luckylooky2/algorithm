// 오르막 수 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim().split("\n"),
  10
);

const dp = new Array(n + 1).fill(null).map((v) => new Array(10).fill(1));

for (let i = 1; i <= n; i++)
  for (let j = 0; j < 10; j++)
    dp[i][j] = ((j > 0 ? dp[i][j - 1] : 0) + dp[i - 1][j]) % 10007;

console.log(dp[n][10 - 1]);
