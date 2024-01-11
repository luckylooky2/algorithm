// 말이 되고픈 원숭이 : 그래프, 너비 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [k] = input.shift();
const [w, h] = input.shift();
const map = input;
const jumpDir = [
  [-1, -2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
];
const moveDir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
let visited = new Array(k + 1)
  .fill(null)
  .map(() => new Array(h).fill(null).map(() => new Array(w).fill(0)));

function bfs() {
  const q = [[0, 0, 0]];
  visited[0][0][0] = 0;

  while (q.length !== 0) {
    const [currX, currY, jumpCnt] = q.shift();
    if (currX === w - 1 && currY === h - 1) {
      console.log(visited[jumpCnt][currY][currX]);
      return;
    }

    if (jumpCnt < k) {
      for (let i = 0; i < jumpDir.length; i++) {
        const [nextX, nextY] = [currX + jumpDir[i][0], currY + jumpDir[i][1]];
        if (nextX >= 0 && nextX < w && nextY >= 0 && nextY < h) {
          if (map[nextY][nextX] === 0 && !visited[jumpCnt + 1][nextY][nextX]) {
            visited[jumpCnt + 1][nextY][nextX] =
              visited[jumpCnt][currY][currX] + 1;
            q.push([nextX, nextY, jumpCnt + 1]);
          }
        }
      }
    }
    for (let i = 0; i < moveDir.length; i++) {
      const [nextX, nextY] = [currX + moveDir[i][0], currY + moveDir[i][1]];
      if (nextX >= 0 && nextX < w && nextY >= 0 && nextY < h) {
        if (map[nextY][nextX] === 0 && !visited[jumpCnt][nextY][nextX]) {
          visited[jumpCnt][nextY][nextX] = visited[jumpCnt][currY][currX] + 1;
          q.push([nextX, nextY, jumpCnt]);
        }
      }
    }
  }
  console.log(-1);
}

bfs(0, 0, 0);

// 시도 1. 4 + 8 방향을 한꺼번에 큐에서 처리. visited 보다 작은 경우 continue
// 시도 2. 점프한 후 BFS. BFS한 모든 곳에서 점프 시도
// 시도 3. BFS => 가장 작은 숫자부터 스택에 push 후, 그 숫자부터 점프 후 BFS
// 시도 4. 단계별 맵
