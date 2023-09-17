// 이동하기 : 동적 계획법
const map = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = map.shift();
const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    dp[i][j] =
      Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) +
      map[i - 1][j - 1];
    [j - 1];
  }
}

console.log(dp[n][m]);
