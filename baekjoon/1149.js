// RGB거리 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const n = arr.shift()[0];
const RED = 0;
const GREEN = 1;
const BLUE = 2;

const dp = new Array(n).fill(null).map((v) => new Array(3).fill(Infinity));
dp[0] = arr[0].map((v) => v);

for (let i = 1; i < n; i++) {
  // red
  dp[i][GREEN] = Math.min(dp[i][GREEN], dp[i - 1][RED] + arr[i][GREEN]);
  dp[i][BLUE] = Math.min(dp[i][BLUE], dp[i - 1][RED] + arr[i][BLUE]);
  // green
  dp[i][RED] = Math.min(dp[i][RED], dp[i - 1][GREEN] + arr[i][RED]);
  dp[i][BLUE] = Math.min(dp[i][BLUE], dp[i - 1][GREEN] + arr[i][BLUE]);
  // blue
  dp[i][RED] = Math.min(dp[i][RED], dp[i - 1][BLUE] + arr[i][RED]);
  dp[i][GREEN] = Math.min(dp[i][GREEN], dp[i - 1][BLUE] + arr[i][GREEN]);
}

console.log(Math.min(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]));
