// LCS : 동적 계획법
const [first, second] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const dp = new Array(second.length + 1)
  .fill(null)
  .map(() => new Array(first.length + 1).fill(0));

for (let i = 1; i <= second.length; i++) {
  for (let j = 1; j <= first.length; j++) {
    if (first[j] === second[i]) dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}

console.log(dp[second.length][first.length]);
