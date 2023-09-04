// 제곱수의 합 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const max = Math.floor(Math.sqrt(n));
const dp = new Array(max + 1).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) dp[1][i] = i;

for (let i = 2; i <= max; i++) {
  const curr = Math.pow(i, 2);
  for (let j = 1; j <= n; j++) {
    if (j - curr >= 0) dp[i][j] = Math.min(dp[i][j - curr] + 1, dp[i - 1][j]);
    else dp[i][j] = dp[i - 1][j];
  }
}

console.log(dp[max][n]);
