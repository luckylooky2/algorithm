// 돌 게임 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const dp = new Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  let first = dp[i - 1] + 1;
  let second = i - 3 >= 0 ? dp[i - 3] + 1 : Infinity;
  // 홀수인 것을 먼저 선택
  if (first % 2 && second % 2 === 0) dp[i] = first;
  else if (first % 2 === 0 && second % 2) dp[i] = second;
  else dp[i] = Math.min(first, second);
}

console.log(dp[n] % 2 ? "SK" : "CY");
