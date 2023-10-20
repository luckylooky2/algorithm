// 구간 합 구하기 4 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const arr = input.shift();
const dp = new Array(n + 1).fill(0);
const answer = [];

for (let i = 1; i <= n; i++) dp[i] = dp[i - 1] + arr[i - 1];

input.map((v) => {
  answer.push(dp[v[1]] - dp[v[0] - 1]);
});

console.log(answer.join("\n"));
