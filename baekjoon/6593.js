// 상범 빌딩 : 그래프, 너비 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let index = 0;
const answer = [];
// z, x, y 순서
const dir = [
  [0, -1, 0],
  [0, 0, 1],
  [0, 1, 0],
  [0, 0, -1],
  [1, 0, 0],
  [-1, 0, 0],
];

function bfs(building, x, y, z) {
  const q = [];
  const visited = building.map((v) => v.map((v) => v.map(() => 0)));

  for (let i = 0; i < z; i++) {
    for (let j = 0; j < x; j++) {
      for (let k = 0; k < y; k++) {
        if (building[i][j][k] === "S") {
          q.push([i, j, k]);
          visited[i][j][k] = 1;
          break;
        }
      }
    }
  }

  while (q.length !== 0) {
    const [currZ, currX, currY] = q.shift();
    if (building[currZ][currX][currY] === "E") {
      return visited[currZ][currX][currY] - 1;
    }
    for (let i = 0; i < dir.length; i++) {
      const [nextZ, nextX, nextY] = [
        currZ + dir[i][0],
        currX + dir[i][1],
        currY + dir[i][2],
      ];
      if (
        nextZ < 0 ||
        nextZ >= z ||
        nextX < 0 ||
        nextX >= x ||
        nextY < 0 ||
        nextY >= y ||
        building[nextZ][nextX][nextY] === "#" ||
        visited[nextZ][nextX][nextY]
      ) {
        continue;
      }
      visited[nextZ][nextX][nextY] = visited[currZ][currX][currY] + 1;
      q.push([nextZ, nextX, nextY]);
    }
  }
  return null;
}

while (true) {
  // parse
  const [z, x, y] = input[index++].split(" ").map((v) => Number(v));
  const building = [];
  if (!z && !x && !y) {
    break;
  }

  for (let i = 0; i < z; i++) {
    const floor = [];
    for (let j = 0; j < x; j++) {
      const splitted = input[index++].split("");
      floor.push(splitted);
    }
    index++;
    building.push(floor);
  }

  // solve
  const res = bfs(building, x, y, z);
  answer.push(res === null ? "Trapped!" : `Escaped in ${res} minute(s).`);
}

console.log(answer.join("\n"));
