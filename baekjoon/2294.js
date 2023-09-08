// 동전 2 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, k] = input.shift();
const arr = input.flat();
const dp = new Array(n + 1)
  .fill(null)
  .map(() => new Array(k + 1).fill(Infinity));

for (let i = 1; i <= n; i++) {
  const value = arr[i - 1];
  for (let j = 1; j <= k; j++) {
    const quotient = j % value ? Infinity : j / value;
    const prevStep = dp[i - 1][j];
    const currStep =
      j >= value
        ? dp[i][j - value] === Infinity
          ? Infinity
          : dp[i][j - value] + 1
        : Infinity;
    dp[i][j] = Math.min(quotient, prevStep, currStep);
  }
}

console.log(dp[n][k] === Infinity ? -1 : dp[n][k]);
