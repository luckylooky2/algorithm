// 1, 2, 3 더하기 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));

const dp = new Array(3).fill(null).map(() => new Array(11).fill(1));

for (let j = 2; j <= 1000; j++) {
  dp[1][j] = dp[1][j - 1] + dp[1][j - 2];
}

for (let j = 2; j <= 1000; j++) {
  dp[2][j] = dp[2][j - 1] + dp[2][j - 2] + (j - 3 >= 0 ? dp[2][j - 3] : 0);
}

arr.filter((v, i) => i !== 0).forEach((v) => console.log(dp[2][v]));
