// 로봇 청소기 : 구현, 시뮬레이션
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [row, col] = input.shift();
const [r, c, d] = input.shift();
const map = input;
const [CLEANED, UNCLEANED, WALL] = [-1, 0, 1];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const q = [[r, c, d]];
let idx = 0;
let answer = 0;

while (idx < q.length) {
  let [cx, cy, d] = q[idx++];
  // 1. 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
  if (map[cx][cy] === UNCLEANED) {
    map[cx][cy] = CLEANED;
    answer++;
  }
  // 현재 칸의 주변 4칸을 검사
  let flag = false;
  loop: for (const [dx, dy] of dir) {
    const [nx, ny] = [cx + dx, cy + dy];
    if (nx < 0 || nx >= row || ny < 0 || ny >= col) {
      continue;
    }
    if (map[nx][ny] === UNCLEANED) {
      flag = true;
      break loop;
    }
  }

  // 3. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
  if (flag) {
    // 3-1. 반시계 방향으로 90도 회전한다.
    d = (d - 1 + 4) % 4;
    const [dx, dy] = dir[d];
    const [nx, ny] = [cx + dx, cy + dy];
    // 3-2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
    if (!(nx < 0 || nx >= row || ny < 0 || ny >= col) && map[nx][ny] === UNCLEANED) {
      q.push([nx, ny, d]);
      // 3-3. 1번으로 돌아간다.
    } else {
      q.push([cx, cy, d]);
    }
    // 2. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우
  } else {
    const [dx, dy] = dir[d];
    const [px, py] = [cx - dx, cy - dy];
    // 2-2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
    if (!(px < 0 || px >= row || py < 0 || py >= col) && map[px][py] === WALL) {
      break;
      // 후진할 수 없다면(맵의 끝이라면) 그대로
    } else if (px < 0 || px >= row || py < 0 || py >= col) {
      q.push([cx, cy, d]);
      // 2-1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
    } else {
      q.push([px, py, d]);
    }
  }
}

console.log(answer);

// 구현 문제는 반드시 주석을 달면서 하자
// - 그래야 문제의 조건을 정확하게 비교할 수 있고, 파악도 빠르게 할 수 있다.
