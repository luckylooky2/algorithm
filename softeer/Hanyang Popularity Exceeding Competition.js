// Hanyang Popularity Exceeding Competition : 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const dp = new Array(n).fill(null).map(() => new Array(2).fill(0));
const [O, X] = [0, 1];
let answer = 0;

for (let i = 0; i < n; i++) {
  const [pi, ci] = input[i];

  for (let j = 0; j < 2; j++) {
    const prev = i > 0 ? dp[i - 1][j] : 0;
    const target = pi - prev;
    if (-1 * ci <= target && target <= ci) {
      dp[i][O] = Math.max(dp[i][O], prev + 1);
      answer = Math.max(dp[i][O], answer);
    } else {
      dp[i][X] = Math.max(dp[i][X], prev);
      answer = Math.max(dp[i][X], answer);
    }
  }
}

console.log(answer);
