// 가장 큰 증가하는 부분 수열 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const [arr] = input;
const dp = new Array(n + 1).fill(0);
let answer = 0;

for (let i = 1; i <= n; i++) {
  let max = 0;
  const curr = arr[i - 1];
  for (let j = 1; j <= i - 1; j++)
    if (curr > arr[j - 1]) max = Math.max(dp[j], max);
  dp[i] = max + curr;
  answer = Math.max(dp[i], answer);
}

console.log(answer);
