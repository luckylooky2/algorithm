// 달이 차오른다, 가자. : 너비 우선 탐색, 그래프, 비트마스킹
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = input.map((v) => v.split(""));
const [BLANK, WALL, START, FINISH] = [".", "#", "0", "1"];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
// 3차원 배열 : 이미 지나왔던 길이라도, 특정 열쇠를 주운 후에 다시 한 번 지나가는 길은 다른 의미를 가지기 때문
const visited = new Array(n)
  .fill(null)
  .map(() => new Array(m).fill(null).map(() => new Array(65).fill(false)));
let startPos;
let [answer, flag] = [Infinity, false];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === START) {
      startPos = [i, j];
    }
  }
}
visited[startPos[0]][startPos[1]][0] = true;

const q = [[startPos, 0, 0]];
let idx = 0;
const doors = "ABCDEF".split("").reduce((acc, curr, i) => {
  acc[curr] = i + 1;
  return acc;
}, {});
const keys = "abcdef".split("").reduce((acc, curr, i) => {
  acc[curr] = i + 1;
  return acc;
}, {});
while (idx < q.length) {
  const [[currRow, currCol], count, holdingKeys] = q[idx++];

  for (const [dr, dc] of dir) {
    const [nextRow, nextCol] = [dr + currRow, dc + currCol];

    if (
      nextRow < 0 ||
      nextRow >= n ||
      nextCol < 0 ||
      nextCol >= m ||
      map[nextRow][nextCol] === WALL ||
      visited[nextRow][nextCol][holdingKeys]
    ) {
      continue;
    }
    const next = map[nextRow][nextCol];
    if (next === BLANK || next === FINISH || next === START) {
      if (next === FINISH) {
        answer = Math.min(answer, count + 1);
        flag = true;
      }
      q.push([[nextRow, nextCol], count + 1, holdingKeys]);
      visited[nextRow][nextCol][holdingKeys] = count + 1;
    } else if (doors[next]) {
      const isOpen = holdingKeys & (1 << doors[next]);
      if (isOpen) {
        q.push([[nextRow, nextCol], count + 1, holdingKeys]);
        visited[nextRow][nextCol][holdingKeys] = count + 1;
      }
    } else if (keys[next]) {
      const newKey = holdingKeys | (1 << keys[next]);
      q.push([[nextRow, nextCol], count + 1, newKey]);
      visited[nextRow][nextCol][newKey] = count + 1;
    }
  }
}

console.log(flag ? answer : -1);

// 3차원 visited 배열을 사용하는 문제
// - 벽을 부수거나 점프를 할 수 있을 때 최단 거리를 찾는 문제나 이 문제처럼 bfs에 여러 가지 변수가 있을 때
// - 3차원 visited 배열을 생각해보자

// 문을 지나가지 못하는 경우에는 큐에 다음 이동을 추가할 수 없음
// 지나갔던 거리를 다시 돌아오기 위해서는 3차원 visited 배열이 필요하다
// 열쇠를 획득한 순간, 이전 상태와는 다른 상태가 되어 못 지나갔던 길을 다시 지나갈 수 있기 때문에, 온 길을 다시 갈 수 있어야 한다
// - 열쇠 3차원 배열을 이용하여 열쇠를 먹을 때마다 2차원 배열을 바꿔줌으로써 지나온 길(이전 상태)을 다시 지나갈 수(현재 상태) 있게 한다
// **왜냐하면 이미 지나왔던 길이라도, 특정 열쇠를 주운 후에 다시 한번 지나가는 길은 다른 의미를 가지고 있기 때문이다**

// 비트마스킹 자체는 시공간 복잡도를 조금 더 효율적으로 사용하기 위한 기술

// bfs + 3차원 visited 배열이 아직 완벽하게 이해되지 않음 => 생각해보려고 노력해보자

// https://yabmoons.tistory.com/102
