// 불!
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
const map = input.map((v) => v.split(""));
const q = new Queue();
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let start;
let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "F") q.push([i, j]);
    else if (map[i][j] === "J") start = [i, j];
  }
}

while (q.size !== 0) {
  const top = q.head.value;
  q.pop();
  for (let i = 0; i < dir.length; i++) {
    const next = [top[0] + dir[i][0], top[1] + dir[i][1]];
    if (
      next[0] < 0 ||
      next[0] >= n ||
      next[1] < 0 ||
      next[1] >= m ||
      map[next[0]][next[1]] === "#" ||
      map[next[0]][next[1]] === "F"
    )
      continue;
  }
}

console.log(start);
