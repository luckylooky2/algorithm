// 정수 삼각형 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const n = arr[0][0];
const dp = [null];
dp[1] = arr[1];

for (let i = 2; i <= n; i++) {
  const lst = [];
  for (let j = 0; j < i; j++) {
    const currElem = arr[i][j];
    const prevElem = Math.max(
      j === 0 ? 0 : dp[i - 1][j - 1],
      j === i - 1 ? 0 : dp[i - 1][j]
    );
    lst.push(currElem + prevElem);
  }
  dp.push(lst);
}

let max = -Infinity;
for (let i = 0; i < n; i++) max = Math.max(dp[n][i], max);
console.log(max);
