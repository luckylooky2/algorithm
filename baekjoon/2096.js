// 내려가기 : 동적 계획법, 슬라이딩 윈도우
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = arr.shift();
const dp = new Array(n + 1)
  .fill(null)
  .map(() => new Array(3).fill(null).map((v) => new Array(2).fill(0)));
const MIN = 0,
  MAX = 1;

for (let i = 1; i <= n; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 0) {
      dp[i][j][MIN] = Math.min(dp[i - 1][0][MIN], dp[i - 1][1][MIN]);
      dp[i][j][MAX] = Math.max(dp[i - 1][0][MAX], dp[i - 1][1][MAX]);
    } else if (j === 1) {
      dp[i][j][MIN] = Math.min(
        dp[i - 1][0][MIN],
        dp[i - 1][1][MIN],
        dp[i - 1][2][MIN]
      );
      dp[i][j][MAX] = Math.max(
        dp[i - 1][0][MAX],
        dp[i - 1][1][MAX],
        dp[i - 1][2][MAX]
      );
    } else {
      dp[i][j][MIN] = Math.min(dp[i - 1][1][MIN], dp[i - 1][2][MIN]);
      dp[i][j][MAX] = Math.max(dp[i - 1][1][MAX], dp[i - 1][2][MAX]);
    }
    dp[i][j][MIN] += arr[i - 1][j];
    dp[i][j][MAX] += arr[i - 1][j];
  }
}

console.log(
  Math.max(dp[n][0][MAX], dp[n][1][MAX], dp[n][2][MAX]),
  Math.min(dp[n][0][MIN], dp[n][1][MIN], dp[n][2][MIN])
);
