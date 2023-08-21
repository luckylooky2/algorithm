// 쉬운 계단 수 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const dp = new Array(n + 1).fill(null).map(() => new Array(10).fill(0));
dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const answer = [null, 9];

for (let i = 2; i <= n; i++) {
  let total = 0;
  for (let j = 0; j <= 9; j++) {
    dp[i][j] =
      ((j === 0 ? 0 : dp[i - 1][j - 1]) + (j === 9 ? 0 : dp[i - 1][j + 1])) %
      1000000000;
    total += dp[i][j];
  }
  answer.push(total % 1000000000);
}

console.log(answer[n]);
