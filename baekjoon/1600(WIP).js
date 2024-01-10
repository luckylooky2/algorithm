// 말이 되고픈 원숭이
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [k] = input.shift();
const [w, h] = input.shift();
const map = input;
const dir = [
  [-1, -2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const visited = new Array(h).fill(null).map(() => new Array(w).fill(0));
const q = [[0, 0, 0]];

while (q.length !== 0) {
  const [currX, currY, jumpCount] = q.shift();
  for (let i = 0; i < dir.length; i++) {
    const [nextX, nextY] = [currX + dir[i][0], currY + dir[i][1]];
    if (
      nextX < 0 ||
      nextX >= w ||
      nextY < 0 ||
      nextY >= h ||
      map[nextY][nextX] === 1 ||
      (0 <= i && i < 8 && jumpCount >= k)
    ) {
      continue;
    }
    if (
      visited[currY][currX] + 1 < visited[nextY][nextX] ||
      visited[nextY][nextX] === 0
    ) {
      q.push([nextX, nextY, jumpCount + (0 <= i && i < 8 ? 1 : 0)]);
      visited[nextY][nextX] = visited[currY][currX] + 1;
    }
  }
}

if (visited[h - 1][w - 1] === 0) {
  visited[h - 1][w - 1] = -1;
}

console.log(visited[h - 1][w - 1]);
