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

//
function bfs() {
  const q = [[0, 0, 0]];
  visited[0][0][0] = 0;

  while (q.length !== 0) {
    const [currX, currY, jumpCnt] = q.shift();

    // 처음 나오는 도착 지점 (w - 1, h - 1)을 바로 선택해도 되는 이유?
    // 순서상 점프를 이동보다 먼저 하기 때문에
    if (currX === w - 1 && currY === h - 1) {
      console.log(visited[jumpCnt][currY][currX]);
      return;
    }

    // 점프를 할 수 있는 경우와 점프를 할 수 없는 경우를 나눈다
    // 나눈 다음 같은 맵에 저장하지 않는 것이 중요! => 점프는 jumpCnt + 1, 이동은 jumpCnt 배열에 저장
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
// - 위의 모든 방법은 하나의 visited 맵을 사용하기 때문에, 한 번 점프를 한 후의 BFS 결과가 점프를 하기 전을 수행할 때 영향을 미칠 수 있음
// 시도 4. 단계별 맵
// - 단계별 모든 맵을 다 채우는 것이 아님

// 순서
// 1. 시작 단계에서 점프할 수 있는 곳 / 이동할 수 있는 곳을 큐에 push
// - 점프할 수 있는 곳 : 점프를 사용했으므로 사용한 점프 수 단계(+ 1)의 맵에 이동 횟수(+ 1)를 저장
// - 이동할 수 있는 곳 : 점프를 사용하지 않았으므로 같은 단계의 맵에 이동 횟수(+ 1)를 저장
// 2. 단계별 맵에서 값이 겹칠 경우는?
// - 최신화(업데이트)하지 않음
// - 이후에 기록된 값은 반드시 값이 클 것이라는 전제. 왜냐하면 방문한 곳을 다시 방문하는 순간 그 경로는 최단 경로라고 할 수 없기 때문(BFS)
