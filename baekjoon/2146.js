// 다리 만들기 : 그래프, 너비 우선 탐색, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;
const candidates = [];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let answer = Infinity;

function findIsland(map) {
  let id = -1;
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (map[x][y] === 1) {
        map[x][y] = id;
        const q = [[x, y]];
        while (q.length !== 0) {
          const [currX, currY] = q.shift();
          for (let i = 0; i < dir.length; i++) {
            const [nextX, nextY] = [currX + dir[i][0], currY + dir[i][1]];
            if (
              nextX < 0 ||
              nextX >= n ||
              nextY < 0 ||
              nextY >= n ||
              map[nextX][nextY] <= 0
            ) {
              continue;
            }
            map[nextX][nextY] = id;
            q.push([nextX, nextY]);
          }
        }
        id--;
      }
    }
  }
}

function bfs(x, y, map) {
  const visited = map.map((v) => v.map(() => 0));
  const q = [[x, y]];
  const currId = map[x][y];

  while (q.length !== 0) {
    const [currX, currY] = q.shift();
    if (map[currX][currY] < 0 && map[currX][currY] !== currId) {
      return visited[currX][currY] - 1;
    }
    for (let i = 0; i < dir.length; i++) {
      const [nextX, nextY] = [currX + dir[i][0], currY + dir[i][1]];
      if (
        nextX < 0 ||
        nextX >= n ||
        nextY < 0 ||
        nextY >= n ||
        visited[nextX][nextY]
      ) {
        continue;
      }
      visited[nextX][nextY] = visited[currX][currY] + 1;
      q.push([nextX, nextY]);
    }
  }
}

findIsland(map);

for (let x = 0; x < n; x++) {
  for (let y = 0; y < n; y++) {
    if (map[x][y] === 0) {
      continue;
    }
    for (let k = 0; k < dir.length; k++) {
      const [nextX, nextY] = [x + dir[k][0], y + dir[k][1]];
      if (nextX < 0 || nextX >= n || nextY < 0 || nextY >= n) {
        continue;
      }
      if (map[nextX][nextY] === 0) {
        answer = Math.min(answer, bfs(x, y, map));
        break;
      }
    }
  }
}

console.log(answer);
