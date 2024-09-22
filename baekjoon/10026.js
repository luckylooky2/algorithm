// 적록색약 : 그래프, 깊이 우선 탐색, 너비 우선 탐색
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const n = +input.shift();
const map = input.map((v) => v.split(""));
const [RED, GREEN, BLUE] = ["R", "G", "B"];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function dfs(currPos, map, visited, isPossible) {
  const [currX, currY] = currPos;
  const currColor = map[currX][currY];
  for (const [dx, dy] of dir) {
    const [nextX, nextY] = [currX + dx, currY + dy];
    if (
      nextX < 0 ||
      nextX >= n ||
      nextY < 0 ||
      nextY >= n ||
      visited[nextX][nextY] ||
      !isPossible(currColor, map[nextX][nextY])
    ) {
      continue;
    }
    visited[nextX][nextY] = true;
    dfs([nextX, nextY], map, visited, isPossible);
  }
}

function solve(map, isPossible) {
  const length = map.length;
  const visited = map.map((v) => v.slice().fill(false));
  let count = 0;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (!visited[i][j]) {
        visited[i][j] = true;
        dfs([i, j], map, visited, isPossible);
        count++;
      }
    }
  }
  return count;
}

console.log(
  solve(map, (curr, next) => curr === next),
  solve(map, (curr, next) => (curr === BLUE ? next === BLUE : next === RED || next === GREEN))
);
