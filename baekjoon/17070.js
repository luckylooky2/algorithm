// 파이프 옮기기 1 : 동적 계획법, 그래프, 그래프 탐색
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = arr.shift();
const RIGHT = 0,
  RIGHT_DOWN = 1,
  DOWN = 2;

const graph = new Array(n)
  .fill(null)
  .map((v, i) => new Array(n).fill(null).map(() => new Array(3).fill(0)));
graph[0][1][RIGHT] = 1;

for (let i = 0; i < n; i++) {
  for (let j = 2; j < n; j++) {
    // 틀렸던 부분
    if (arr[i][j]) continue;

    if (j - 1 >= 0 && !arr[i][j - 1])
      graph[i][j][RIGHT] = graph[i][j - 1][RIGHT] + graph[i][j - 1][RIGHT_DOWN];
    if (
      i - 1 >= 0 &&
      j - 1 >= 0 &&
      !arr[i][j - 1] &&
      !arr[i - 1][j] &&
      !arr[i - 1][j - 1]
    )
      graph[i][j][RIGHT_DOWN] =
        graph[i - 1][j - 1][RIGHT] +
        graph[i - 1][j - 1][RIGHT_DOWN] +
        graph[i - 1][j - 1][DOWN];
    if (i - 1 >= 0 && !arr[i - 1][j])
      graph[i][j][DOWN] = graph[i - 1][j][RIGHT_DOWN] + graph[i - 1][j][DOWN];
  }
}

console.log(graph[n - 1][n - 1].reduce((a, b) => a + b));
