// 토마토 : 그래프, 너비 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [m, n, h] = input.shift();
// map[h][n][m]
const map = new Array(h).fill(null).map(() => new Array(0));
const q = [];
const [BEFORE, AFTER, EMPTY] = [0, 1, -1];
const dir = [
  [0, -1, 0],
  [0, 0, 1],
  [0, 1, 0],
  [0, 0, -1],
  [1, 0, 0],
  [-1, 0, 0],
];
let idx = 0;
let emptyCount = 0;
let answer = 0;

for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    map[i].push(input[idx++]);
    for (let k = 0; k < m; k++) {
      if (map[i][j][k] === AFTER) {
        q.push([i, j, k, 1]);
      } else if (map[i][j][k] === BEFORE) {
        emptyCount++;
      }
    }
  }
}

idx = 0;
while (idx < q.length) {
  const [currH, currX, currY, count] = q[idx++];

  for (const [dh, dx, dy] of dir) {
    const [nextH, nextX, nextY] = [currH + dh, currX + dx, currY + dy];
    if (nextH < 0 || nextH >= h || nextX < 0 || nextX >= n || nextY < 0 || nextY >= m || map[nextH][nextX][nextY]) {
      continue;
    }
    q.push([nextH, nextX, nextY, count + 1]);
    map[nextH][nextX][nextY] = count + 1;
    answer = Math.max(answer, count + 1);
    emptyCount--;
  }
}

console.log(emptyCount ? -1 : Math.max(0, answer - 1));
