// 두더지 잡기
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, s] = arr.shift();
const dp = new Array(n + 1).fill(0);
let answer = 0;

// 거리 기준 정렬
// const sorted = arr.sort(
//   (a, b) =>
//     Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2)) -
//     Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2))
// );

// 시간 기준 정렬
const sorted = arr.sort((a, b) => a[2] - b[2]);
sorted.unshift([0, 0, 0]);

function canMove(curr, prev) {
  const length = Math.sqrt(
    Math.pow(curr[0] - prev[0], 2) + Math.pow(curr[1] - prev[1], 2)
  );
  const limit = (curr[2] - prev[2]) * s;
  if (length <= limit) return true;
  else false;
}

for (let i = 1; i <= n; i++) {
  let max = -Infinity;
  let index = 0;
  let curr = sorted[i];
  for (let j = 0; j < i; j++) {
    // 움직일 수 있는지 확인
    if (canMove(curr, sorted[0]) && canMove(curr, sorted[j])) {
      if (dp[j] > max) {
        index = j;
        max = dp[j];
      }
    }
  }
  if (max !== -Infinity) {
    dp[i] = dp[index] + 1;
    answer = Math.max(dp[i], answer);
  }
}

console.log(answer);
