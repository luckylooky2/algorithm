// 점프 게임 : 그래프, 너비 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n");
const [n, k] = input[0].split(" ").map((v) => Number(v));
const leftLine = input[1].split("").map((v) => Number(v));
const rightLine = input[2].split("").map((v) => Number(v));
const map = [leftLine, rightLine];
const [LEFT, RIGHT] = [0, 1];

const visited = [leftLine.slice().fill(false), rightLine.slice().fill(false)];
const q = [[LEFT, 0, 0]];
let idx = 0;
let isDone = false;

while (idx < q.length) {
  const [currDir, currNum, currTime] = q[idx++];
  const next = [
    [currDir, currNum + 1, currTime + 1],
    [currDir, currNum - 1, currTime + 1],
    [Number(!currDir), currNum + k, currTime + 1],
  ];

  for (const [nextDir, nextNum, nextTime] of next) {
    if (nextNum > n - 1) {
      isDone = true;
      break;
    }
    if (nextNum === n - 1) {
      if (map[nextDir][nextNum] === 1) {
        isDone = true;
        break;
      }
    }
    if (visited[nextDir][nextNum] || map[nextDir][nextNum] === 0) {
      continue;
    }
    if (nextTime - 1 >= nextNum) {
      continue;
    }
    visited[nextDir][nextNum] = true;
    q.push([nextDir, nextNum, nextTime]);
  }
  if (isDone) {
    break;
  }
}

console.log(isDone ? 1 : 0);
