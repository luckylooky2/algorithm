// 토마토 : 그래프 탐색, 너비 우선 탐색
const Queue = require("./queue");
const map = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [m, n] = map.shift();
const q = new Queue();
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let cnt = 0;
let flag = false;
let answer = 1;

for (let i = 0; i < n; i++)
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 1) q.push([i, j]);
    else if (map[i][j] === 0) cnt++;
  }

while (q.size !== 0) {
  const top = q.head.value;
  q.pop();
  for (let i = 0; i < dir.length; i++) {
    const next = [top[0] + dir[i][0], top[1] + dir[i][1]];
    if (
      next[0] >= n ||
      next[0] < 0 ||
      next[1] >= m ||
      next[1] < 0 ||
      map[next[0]][next[1]] !== 0
    )
      continue;
    map[next[0]][next[1]] = map[top[0]][top[1]] + 1;
    answer = Math.max(map[next[0]][next[1]], answer);
    cnt--;
    if (cnt === 0) {
      flag = true;
      break;
    }
    q.push(next);
  }
  if (flag) break;
}

console.log(cnt ? -1 : answer - 1);
