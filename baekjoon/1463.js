// 1로 만들기 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const dp = new Array(3).fill(null).map(() => new Array(n + 1).fill(0));

// 첫 번째 row
for (let i = 0; i < 2; i++) {
  let j = 3 - i;
  let cnt = 1;
  while (j <= n) {
    dp[i][j] = cnt++;
    j *= 3 - i;
  }
}

// 두 번째 row
for (let i = 2; i <= n; i++) {
  if (i % 3 === 0) {
    if (dp[0][i]) dp[1][i] = dp[0][i];
    else {
      const divide = i / 3;
      if (dp[1][divide]) dp[1][i] = 1 + dp[1][divide];
    }
  }
}

// 세 번째 row
for (let i = 2; i <= n; i++) {
  if (dp[1][i] === 0) {
    let res = Infinity;
    if (i % 3 === 0) res = Math.min(dp[2][i / 3] + 1, res);
    if (i % 2 === 0) res = Math.min(dp[2][i / 2] + 1, res);
    dp[2][i] = Math.min(dp[2][i - 1] + 1, res);
  } else dp[2][i] = dp[1][i];
}

console.log(dp[2][n]);
