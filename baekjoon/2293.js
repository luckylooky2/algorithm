// 동전 1 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, value] = arr.shift();
const dp = new Array(n + 1).fill(null).map(() => new Array(value + 1).fill(0));

for (let i = 0; i < n; i++) dp[i][0] = 1;

for (let i = 1; i <= n; i++) {
  const curr = arr[i - 1][0];
  for (let j = 0; j <= value; j++) {
    dp[i][j] = dp[i - 1][j] + (j - curr >= 0 ? dp[i][j - curr] : 0);
  }
}

console.log(dp[n][value]);
