// 알고스팟 : 그래프, 너비 우선 탐색, 다익스트라, 0-1 너비 우선 탐색
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [col, row] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = input.map((v) => v.split("").map((v) => +v));
const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const visit = map.map((v) => v.slice().fill(Infinity));
const visit2 = map.map((v) => v.slice().fill(false));
visit[0][0] = 1;
const candidates = [[0, 0, 1]];
let idx = 0;

function bfs(start, visit, candidates) {
  const q = [start];
  let idx = 0;

  while (idx < q.length) {
    const [cx, cy, count] = q[idx++];
    for (const [dx, dy] of dir) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (
        nx < 0 ||
        nx >= row ||
        ny < 0 ||
        ny >= col ||
        // 이것을 안 넣어주면 메모리 초과
        visit[nx][ny] <= count
      ) {
        continue;
      }
      if (map[nx][ny] === 1) {
        // 하나씩 부심
        if (!visit2[nx][ny]) {
          candidates.push([nx, ny, count + 1]);
          visit2[nx][ny] = true;
        }
        continue;
      }
      visit[nx][ny] = count;
      q.push([nx, ny, count]);
    }
  }
}

while (idx < candidates.length) {
  const curr = candidates[idx++];
  visit[curr[0]][curr[1]] = curr[2];
  bfs(curr, visit, candidates);
}

console.log(visit[row - 1][col - 1] - 1);

// Try 1: 3차원 visit bfs
// - 10000 * 10000 3차원 visit 배열을 만들면, 메모리 초과가 발생하기 때문에 비트마스킹을 사용
// - 시간 초과

// Try 2: dp
// - 오른쪽 아래 방향으로 가면서 왼쪽 위 dp 배열을 참조하여 채움
// - 방향이 왼쪽 위로도 갈 수 있기 때문에 틀린 접근

// Try 3: bfs
// - 벽을 만난 곳에서 새롭게 bfs를 시작

// 0-1 bfs?
// - 작은 수면 큐의 앞에 추가, 큰 수면 큐의 뒤의 추가하는 방법
// - 숨바꼭질 3(13549)과 비슷한 문제
