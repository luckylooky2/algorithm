// 농장 관리 : 그래프, 너비 우선 탐색, 깊이 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [row, col] = input.shift();
const map = input;
const dir = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
const visit = map.map((v) => v.slice());
let answer = 0;

function check(map, i, j) {
  for (const [dx, dy] of dir) {
    const [nx, ny] = [i + dx, j + dy];
    if (nx < 0 || nx >= row || ny < 0 || ny >= col) {
      continue;
    }
    // 높은 것이 있다.
    if (map[i][j] < map[nx][ny]) {
      return false;
    }
  }
  // 높은 것이 없다.
  return true;
}

function bfs(map, i, j, visit) {
  const target = map[i][j];
  visit[i][j] = "c";
  // 같은 모든 지점 색칠
  const q = [[i, j]];
  let idx = 0;
  let flag = true;

  while (idx < q.length) {
    const [x, y] = q[idx++];
    visit[x][y] = "c";
    if (!check(map, x, y)) {
      flag = false;
    }

    for (const [dx, dy] of dir) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx >= row || ny < 0 || ny >= col || map[nx][ny] !== target || visit[nx][ny] === "c") {
        continue;
      }
      q.push([nx, ny]);
    }
  }

  return flag;
}

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (visit[i][j] === "c") {
      continue;
    }

    const res = bfs(map, i, j, visit);
    if (res) {
      answer++;
    }
  }
}

console.log(answer);

// 시작하는 지점에서만 가장 높은지(check 함수)를 확인하는 것이 아니라 bfs로 방문하는 모든 지점에서 하나라도 없어야 한다.
// - bfs를 하기 전에 확인하는 것이 아니고 하면서 확인해야 한다.
