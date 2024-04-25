// 낮잠 시간 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, b] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const fatigue = input.map((v) => Number(v));
const dp = new Array(2)
  .fill(null)
  .map(() => new Array(b + 1).fill(null).map(() => new Array(n + 1).fill(0)));

// col : n, row : b
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= b; j++) {
    dp[0][j][i] = Math.max(dp[0][j][i - 1], dp[1][j][i - 1]);
    dp[1][j][i] = Math.max(
      dp[1][j][i - 1],
      j > 1 ? dp[0][j - 1][i - 1] + fatigue[i] : 0
    );
  }
}

console.log(dp);
console.log(dp[0][b][n], dp[1][b][n]);
// console.log(range);
