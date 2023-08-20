// 피보나치 수 2 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);

const dp = new Array(n + 1).fill(BigInt(0));
dp[1] = BigInt(1);
let i = 2;

while (i <= n) {
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
  i++;
}
console.log(String(dp[n]));
