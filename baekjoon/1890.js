// 점프 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;
const dp = new Array(n).fill(null).map(() => new Array(n).fill(BigInt(0)));
let q = [[n - 1, n - 1]];
let idx = 0;

// row
while (idx !== q.length) {
  const [row, col] = q[idx++];
  let count = 1;
  for (let r = row - 1; r >= 0; r--) {
    if (map[r][n - 1] === count) {
      dp[r][n - 1] += BigInt(1);
      q.push([r, n - 1]);
    }
    count++;
  }
}
q = [[n - 1, n - 1]];
idx = 0;
// column
while (idx !== q.length) {
  const [row, col] = q[idx++];
  let count = 1;
  for (let c = col - 1; c >= 0; c--) {
    if (map[n - 1][c] === count) {
      dp[n - 1][c] += BigInt(1);
      q.push([n - 1, c]);
    }
    count++;
  }
}

for (let row = n - 2; row >= 0; row--) {
  for (let col = n - 2; col >= 0; col--) {
    const right =
      col + map[row][col] >= n ? BigInt(0) : dp[row][col + map[row][col]];
    const down =
      row + map[row][col] >= n ? BigInt(0) : dp[row + map[row][col]][col];
    dp[row][col] = right + down;
  }
}

console.log(String(dp[0][0]));

// BigInt 덧셈 주의하기
