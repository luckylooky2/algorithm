// 거스름돈 : 동적 계획법, 그리디
const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const n = Number(input);
const dp = new Array(2).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
  dp[0][i] = i % 2 ? 0 : Math.floor(i / 2);
}

for (let i = 1; i <= n; i++) {
  if (i <= 5) {
    dp[1][i] = i === 5 ? 1 : dp[0][i];
  } else {
    dp[1][i] = Math.min(
      dp[0][i] === 0 ? Infinity : dp[0][i],
      (dp[1][i - 5] === 0 ? Infinity : dp[1][i - 5]) + 1,
      (dp[1][i - 2] === 0 ? Infinity : dp[1][i - 2]) + 1
    );
  }
}

console.log(dp[1][n] === 0 ? -1 : dp[1][n]);

// dp[1][i - 2] 이하 즉, (dp[1][i - 4], dp[1][i - 6]...)은 dp[1][i - 2]에 포함된 경우이므로 생각하지 않아도 됨

// 29'07"
