// 미로 탐색 : 그래프 탐색, 너비 우선 탐색
const Queue = require("./queue");
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const map = input.map((v) => v.split("").map((v) => parseInt(v, 10)));
const visited = map.map((v) => v.map((v) => 0));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const q = new Queue();
let i = 0,
  j = 0;
let flag = false;

q.push([i, j]);
visited[i][j] = 1;

while (q.size !== 0) {
  const top = q.head.value;
  q.pop();
  for (let i = 0; i < 4; i++) {
    const next = [top[0] + dir[i][0], top[1] + dir[i][1]];
    if (
      next[0] < 0 ||
      next[0] >= n ||
      next[1] < 0 ||
      next[1] >= m ||
      map[next[0]][next[1]] === 0 ||
      visited[next[0]][next[1]] > 0
    )
      continue;
    q.push(next);
    visited[next[0]][next[1]] = visited[top[0]][top[1]] + 1;
    if (next[0] === n - 1 && next[1] === m - 1) {
      flag = true;
      break;
    }
  }
}

console.log(visited[n - 1][m - 1]);
