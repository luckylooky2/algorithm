// 2xn 타일링 2 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim().split("\n"),
  10
);

const dp = new Array(n + 1).fill(1);

for (let i = 2; i <= n; i++) dp[i] = (dp[i - 1] + dp[i - 2] * 2) % 10007;

console.log(dp[n]);
