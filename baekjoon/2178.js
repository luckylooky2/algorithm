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
const visited = map.map((v) => v.map((v) => false));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const q1 = new Queue();
const q2 = new Queue();
let isFirst = true;
let i = 0,
  j = 0;
let cnt = 1;
let flag = false;

q1.push([i, j]);
visited[i][j] = true;

while (!(q1.size === 0 && q2.size === 0)) {
  while (isFirst ? q1.size !== 0 : q2.size !== 0) {
    const top = isFirst ? q1.head.value : q2.head.value;
    isFirst ? q1.pop() : q2.pop();
    for (let i = 0; i < 4; i++) {
      const next = [top[0] + dir[i][0], top[1] + dir[i][1]];
      if (
        next[0] < 0 ||
        next[0] >= n ||
        next[1] < 0 ||
        next[1] >= m ||
        map[next[0]][next[1]] === 0 ||
        visited[next[0]][next[1]] === true
      )
        continue;
      isFirst ? q2.push(next) : q1.push(next);
      visited[next[0]][next[1]] = true;
      if (next[0] === n - 1 && next[1] === m - 1) {
        flag = true;
        break;
      }
    }
  }
  cnt++;
  isFirst = !isFirst;
  if (flag) break;
}

console.log(cnt);
