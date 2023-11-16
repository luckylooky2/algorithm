// 이항 계수 1 : 수학, 동적 계획법
const [n, k] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));
// 재귀로 하는 방법?
const dp = new Array(10 + 1)
  .fill(null)
  .map((_v, i) => new Array(i + 1).fill(1));

for (let i = 2; i <= 10; i++) {
  for (let j = 1; j < dp[i].length - 1; j++) {
    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
  }
}

console.log(dp[n][k]);
