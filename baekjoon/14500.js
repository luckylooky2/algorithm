// 테트로미노 : 구현, 브루트 포스, 깊이 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const map = input;
const visited = map.map((v) => v.slice().map((v) => false));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let answer = 0;

function dfs(x, y, map, visited, depth = 0, total = map[x][y]) {
  if (depth === 3) {
    answer = Math.max(answer, total);
    // return을 안 써서 2시간 정도 날림
    return;
  }

  for (const [dx, dy] of dir) {
    const [nextX, nextY] = [x + dx, y + dy];
    if (
      nextX < 0 ||
      nextX >= n ||
      nextY < 0 ||
      nextY >= m ||
      visited[nextX][nextY]
    ) {
      continue;
    }

    visited[nextX][nextY] = true;
    dfs(nextX, nextY, map, visited, depth + 1, total + map[nextX][nextY]);
    visited[nextX][nextY] = false;
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    visited[i][j] = true;
    dfs(i, j, map, visited);
    visited[i][j] = false;

    // ㅗ 모양
    if (j + 2 < m) {
      const total = map[i][j] + map[i][j + 1] + map[i][j + 2];

      if (i + 1 < n) {
        const rest = map[i + 1][j + 1];
        answer = Math.max(answer, total + rest);
      }

      if (i - 1 >= 0) {
        const rest = map[i - 1][j + 1];
        answer = Math.max(answer, total + rest);
      }
    }

    if (i + 2 < n) {
      const total = map[i][j] + map[i + 1][j] + map[i + 2][j];

      if (j + 1 < m) {
        const rest = map[i + 1][j + 1];
        answer = Math.max(answer, total + rest);
      }

      if (j - 1 >= 0) {
        const rest = map[i + 1][j - 1];
        answer = Math.max(answer, total + rest);
      }
    }
  }
}

console.log(answer);
