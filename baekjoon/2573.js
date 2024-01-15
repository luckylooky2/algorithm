// 빙산 : 그래프, 너비 우선 탐색, 깊이 우선 탐색, 구현
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const map = [input];
const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
let year = 0;
let execpt = false;

function dfs(x, y, map, fill) {
  map[y][x] = fill;
  for (let i = 0; i < dir.length; i++) {
    const [nextX, nextY] = [x + dir[i][0], y + dir[i][1]];
    if (
      nextX < 0 ||
      nextX >= m ||
      nextY < 0 ||
      nextY >= n ||
      map[nextY][nextX] <= 0
    ) {
      continue;
    }
    dfs(nextX, nextY, map, fill);
  }
}

function checkSplitted(map) {
  const copy = map.map((v) => v.map((v) => v));
  let count = -1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (copy[i][j] > 0) {
        dfs(j, i, copy, count);
        count--;
      }
    }
  }
  if (count === -1) execpt = true;
  return count + 1 === -1;
}

while (checkSplitted(map[year])) {
  const prevMap = map[year];
  const newMap = new Array(n).fill(null).map(() => new Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (prevMap[i][j] !== 0) {
        let count = 0;
        for (let k = 0; k < dir.length; k++) {
          const [nextX, nextY] = [j + dir[k][0], i + dir[k][1]];
          if (nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) {
            continue;
          }
          if (prevMap[nextY][nextX] === 0) {
            count++;
          }
        }
        newMap[i][j] = Math.max(prevMap[i][j] - count, 0);
      }
    }
  }
  map.push(newMap);
  year++;
}

console.log(execpt ? 0 : year);
