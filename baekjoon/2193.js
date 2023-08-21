// 이친수 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);

const dp = new Array(n + 1).fill(null).map(() => new Array(2).fill(0));
dp[1] = [BigInt(0), BigInt(1)];
dp[2] = [BigInt(1), BigInt(0)];
dp[3] = [BigInt(1), BigInt(1)];

for (let i = 4; i <= n; i++) {
  dp[i][0] = dp[i - 1][0] + dp[i - 2][0];
  dp[i][1] = dp[i - 1][1] + dp[i - 2][1];
}

console.log(String(dp[n][0] + dp[n][1]));
