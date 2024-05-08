// 알고리즘 수업 - 피보나치 수 1 : 동적 계획법, 재귀 호출
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input[0]);
const answer = [0, n - 3 + 1];

(function fibonacciRecur(n) {
  if (n === 1 || n === 2) {
    answer[0]++;
    return 1;
  }
  return fibonacciRecur(n - 1) + fibonacciRecur(n - 2);
})(n);

(function fibonacciDP(n) {
  const dp = new Array(n + 1).fill(1);
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
})(n);

console.log(answer.join(" "));

// 08'59"
