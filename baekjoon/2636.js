// 치즈 : 시뮬레이션, 그래프, 너비 우선 탐색, 구현
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [row, col] = input.shift();
const map = input;
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const count = [];
const visit = map.map((v) => v.slice().fill(false));
visit[0][0] = true;
let q = [[0, 0]];
let nextQ = [];
let idx = 0;

while (true) {
  while (idx < q.length) {
    const [cx, cy] = q[idx++];
    for (const [dx, dy] of dir) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (nx < 0 || nx >= row || ny < 0 || ny >= col || visit[nx][ny]) {
        continue;
      }
      if (map[nx][ny] === 1) {
        map[nx][ny] = "c";
        nextQ.push([nx, ny]);
      } else {
        q.push([nx, ny]);
      }
      visit[nx][ny] = true;
    }
  }
  if (nextQ.length === 0) {
    break;
  }
  count.push(nextQ.length);
  for (const [x, y] of nextQ) {
    map[x][y] = 0;
    visit[x][y] = false;
  }
  q = nextQ;
  nextQ = [];
  idx = 0;
}

console.log(count.length);
console.log(count.length ? count.at(-1) : 0);

// 가장자리 없애기?
// Try 1
// - 현재 위치에서 사방향 중 하나라도 0이 있는 경우 || 사방향 중 하나라도 c가 있는 경우 => 틀림

// Try 2
// - bfs로 순회하면서 기존의 0으로 제거할 수 있는 1을 c로 변경후 nextQ에 추가
// - c를 0로 바꾸면서 visit 배열 false로 초기화 및 q와 nextQ 교체
// - 핵심은 단계를 나누는 것이다. 1을 0으로 바로 바꿔버리면 단계를 구분할 수 없어 모두 0으로 바뀌게 된다.
