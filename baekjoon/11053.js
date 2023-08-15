// 가장 긴 증가하는 부분 수열 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const n = input.shift()[0];
const [arr] = input;
const dp = {};
let final = 1;

dp[arr[0]] = 1;
for (let i = 1; i < n; i++) {
  let max = -Infinity;
  for (let j = i - 1; j >= 0; j--)
    if (arr[i] - arr[j] > 0) max = Math.max(dp[arr[j]], max);
  dp[arr[i]] = max === -Infinity ? 1 : max + 1;
  final = Math.max(dp[arr[i]], final);
}

console.log(final);
