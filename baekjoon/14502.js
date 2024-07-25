// 연구소 : 브루트 포스, 너비 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [row, col] = input.shift();
const map = input;
const zeroCoord = [];
let answer = 0;

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (map[i][j] === 0) {
      zeroCoord.push(i * col + j);
    }
  }
}

for (let i = 0; i < zeroCoord.length; i++) {
  for (let j = i + 1; j < zeroCoord.length; j++) {
    for (let k = j + 1; k < zeroCoord.length; k++) {
      const res = bfs([zeroCoord[i], zeroCoord[j], zeroCoord[k]], map);
    }
  }
}

function bfs([x, y, z], map) {
  const copy = map.map((v) => v.slice());
  copy[Math.floor(x / col)][x % col] = 1;
  copy[Math.floor(y / col)][y % col] = 1;
  copy[Math.floor(z / col)][z % col] = 1;
  const visited = map.map((v) => v.slice().fill(false));
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const q = [];
  let res = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (copy[i][j] === 2) {
        q.push([i, j]);
      } else if (copy[i][j] === 0) {
        res++;
      }
    }
  }

  let index = 0;
  while (index < q.length) {
    const [x, y] = q[index++];
    for (const [dx, dy] of dir) {
      const [nextX, nextY] = [dx + x, dy + y];
      if (
        nextX < 0 ||
        nextX >= row ||
        nextY < 0 ||
        nextY >= col ||
        visited[nextX][nextY] ||
        copy[nextX][nextY] === 1 ||
        copy[nextX][nextY] === 2
      ) {
        continue;
      }

      q.push([nextX, nextY]);
      copy[x][y] = 2;
      res--;
      visited[nextX][nextY] = true;
    }
  }

  answer = Math.max(answer, res);
}

console.log(answer);
