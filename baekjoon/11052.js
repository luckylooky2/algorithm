// 카드 구매하기 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const [n] = input.shift();
const [arr] = input;
const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (j - i >= 0)
      dp[i][j] = Math.max(arr[i - 1] + dp[i][j - i], dp[i - 1][j]);
    else dp[i][j] = dp[i - 1][j];
  }
}

console.log(dp[n][n]);
