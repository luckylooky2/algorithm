// 이항 계수 2 : 수학, 동적 계획법
const [n, k] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

const dp = new Array(n + 1).fill(null).map((v, i) => new Array(i + 1).fill(1));

for (let i = 2; i <= n; i++) {
  for (let j = 1; j < i; j++) {
    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007;
  }
}

console.log(dp[n][k]);
