// 행렬 곱셈 순서 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const matrix = input.map((v) => v.split(" ").map((v) => Number(v)));
const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));
const result = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
  result[i][i] = matrix[i - 1];
}

// 대각선 방향 init
for (let i = 1; i < n; i++) {
  dp[i][i + 1] =
    result[i][i][0] * result[i + 1][i + 1].reduce((acc, curr) => acc * curr, 1);
  result[i][i + 1] = [result[i][i][0], result[i + 1][i + 1][1]];
}

// 대각선 방향 채우기
// - e.g. [1, 3], [2, 4] ... [1, 4]
for (let i = 2; i < n; i++) {
  for (let j = 1; j + i <= n; j++) {
    let min = Infinity;
    let range = [];
    let count = end - start + 1;
    let [start, end] = [j, j + i];
    // n개와 1개를 합치는 경우
    const candidates = [
      [start, end - 1],
      [start + 1, end],
    ];
    for (let k = 0; k < 2; k++) {
      const [s, e] = candidates[k];
      let prev, curr;
      if (k === 0) {
        prev = result[s][e];
        curr = matrix[e];
      } else {
        prev = matrix[s - 2];
        curr = result[s][e];
      }
      const res =
        dp[s][e] + prev[0] * curr.reduce((acc, curr) => acc * curr, 1);
      if (min > res) {
        min = res;
        range = [prev[0], curr[1]];
      }
    }
    // n개와 m개를 합치는 경우
    const candidates2 = [];
    for (let k = 2; k <= count - 2; k++) {
      candidates2.push([k, count - k]);
    }
    for (const [s, e] of candidates2) {
      const prev = result[start][end - s];
      const curr = result[start + e][end];
      const res =
        dp[start][end - s] +
        dp[start + e][end] +
        prev[0] * curr.reduce((acc, curr) => acc * curr, 1);
      if (min > res) {
        min = res;
        range = [prev[0], curr[1]];
      }
    }
    dp[start][end] = min;
    result[start][end] = range;
  }
}

console.log(dp[1][n]);

// 114'13"

// dp 테이블 : row 부터 column 까지 최소 곱셈 횟수
// [1, 5]의 최소 곱셈 횟수를 구하는 방법은
// - [1, 4], [5] / [1, 3], [4, 5] / [1, 2], [3, 5] / [1], [2, 5]
// - 각각의 범위는 미리 구해놓아야 함
// - 대각선 방향으로 초기화하면 됨
