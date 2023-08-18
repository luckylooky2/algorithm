// 파도반 수열 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));

const n = arr.shift();
const dp = [0, 1, 1, 1, 2, 2];

arr.forEach((v) => {
  for (let i = dp.length; i <= v; i++) dp[i] = dp[i - 1] + dp[i - 5];
  console.log(dp[v]);
});
