// 보물섬 : 그래프, 너비 우선 탐색, 브루트 포스
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = input.map((v) => v.split(""));
const [LAND, SEA] = ["L", "W"];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let answer = 0;

function bfs(map, start) {
  const visited = map.map((v) => v.slice().map((v) => (v === LAND ? 0 : -1)));
  const q = [start];
  // 시작 지점 지정
  visited[start[0]][start[1]] = 1;
  let idx = 0;
  let result = 0;

  while (idx < q.length) {
    const [currX, currY] = q[idx++];

    for (const [dx, dy] of dir) {
      const [nextX, nextY] = [currX + dx, currY + dy];
      if (nextX < 0 || nextX >= n || nextY < 0 || nextY >= m || visited[nextX][nextY]) {
        continue;
      }
      q.push([nextX, nextY]);
      visited[nextX][nextY] = visited[currX][currY] + 1;
      result = Math.max(result, visited[currX][currY] + 1);
    }
  }

  return result - 1;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === LAND) {
      const result = bfs(map, [i, j]);
      answer = Math.max(answer, result);
    }
  }
}

console.log(answer);
