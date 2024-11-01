// 나무 섭지 : 너비 우선 탐색, 그래프
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [row, col] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = input.map((v) => v.split(""));
const [EXIT, GHOST, ME, WALL] = ["D", "G", "N", "#"];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const [TRUE, FALSE] = ["Yes", "No"];
let startPos, endPos;
const ghosts = [];

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    const pos = [i, j];
    if (map[i][j] === EXIT) {
      endPos = pos;
    } else if (map[i][j] === ME) {
      startPos = pos;
    } else if (map[i][j] === GHOST) {
      ghosts.push(pos);
    }
  }
}

function bfs(startPos, endPos) {
  const q = [startPos];
  const visit = map.map((v) => v.slice().fill(0));
  visit[startPos[0]][startPos[1]] = 1;
  let idx = 0;

  while (idx < q.length) {
    const [x, y] = q[idx++];
    for (const [dx, dy] of dir) {
      const [nx, ny] = [x + dx, y + dy];
      if (
        nx < 0 ||
        nx >= row ||
        ny < 0 ||
        ny >= col ||
        visit[nx][ny] ||
        map[nx][ny] === WALL
      ) {
        continue;
      }
      q.push([nx, ny]);
      visit[nx][ny] = visit[x][y] + 1;
      if (nx === endPos[0] && ny === endPos[1]) {
        return visit[nx][ny] - 1;
      }
    }
  }
  return null;
}

function calcDist(posA, posB) {
  return Math.abs(posA[0] - posB[0]) + Math.abs(posA[1] - posB[1]);
}

function solve() {
  let distToGhost = Infinity;
  for (const ghostPos of ghosts) {
    distGhostToEnd = Math.min(distToGhost, calcDist(ghostPos, endPos));
  }
  const [minX, maxX] = [
    Math.min(startPos[0], endPos[0]),
    Math.max(startPos[0], endPos[0]),
  ];
  const [minY, maxY] = [
    Math.min(startPos[1], endPos[1]),
    Math.max(startPos[1], endPos[1]),
  ];

  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      if (map[i][j] === GHOST) {
        return FALSE;
      }
    }
  }
  const moved = bfs(startPos, endPos);
  if (moved === null) {
    return FALSE;
  }
  // moved >= distToEnd + distToGhost가 아니라 moved >= distGhostToEnd
  if (moved >= distGhostToEnd) {
    return FALSE;
  }
  return TRUE;
}

console.log(solve());
