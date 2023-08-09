// 평범한 배낭 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const [n, capacity] = arr.shift();

const dp = new Array(n + 1)
  .fill(null)
  .map(() => new Array(capacity + 1).fill(0));

for (let i = 1; i <= n; ++i) {
  for (let j = 1; j <= capacity; j++) {
    const newWeight = arr[i - 1][0];
    const newValue = arr[i - 1][1];
    if (newWeight <= j) {
      dp[i][j] = Math.max(newValue + dp[i - 1][j - newWeight], dp[i - 1][j]);
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

console.log(dp[n][capacity]);
