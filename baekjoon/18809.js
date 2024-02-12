// Gaaaaaaaaaarden : 백트래킹, 그래프, 너비 우선 탐색, 시뮬레이션
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m, g, r] = input.shift();
const map = input;
const candidates = [];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let answer = 0;
// 0 : 호수, 1 : 배양액 x, 2 : 배양액 o
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 2) {
      candidates.push([i, j]);
    }
  }
}

const visited = new Array(candidates.length).fill(0);
const createMap = function (visited, candidates) {
  const newMap = map.map((v) => v.map((v) => (v === 0 ? 0 : Infinity)));
  const selected = [];
  for (let i = 0; i < visited.length; i++) {
    const type = visited[i];
    if (type > 0) {
      const [x, y] = candidates[i];
      newMap[x][y] = type === 1 ? 1 : -1;
      selected.push([x, y]);
    }
  }
  return [newMap, selected];
};
const bfs = function (visited, candidates) {
  const [map, q] = createMap(visited, candidates);
  let flowers = 0;

  while (q.length !== 0) {
    const [currX, currY] = q.shift();
    const currValue = map[currX][currY];
    if (currValue === 0) {
      continue;
    }
    const nextValue = currValue > 0 ? currValue + 1 : currValue - 1;
    for (let [dirX, dirY] of dir) {
      const [nextX, nextY] = [currX + dirX, currY + dirY];
      if (
        nextX < 0 ||
        nextX >= n ||
        nextY < 0 ||
        nextY >= m ||
        map[nextX][nextY] === 0
      ) {
        continue;
      }
      if (map[nextX][nextY] === Infinity) {
        map[nextX][nextY] = nextValue;
        q.push([nextX, nextY]);
      } else {
        // 꽃인지 확인
        if (map[nextX][nextY] + nextValue === 0) {
          flowers++;
          // 큐애서 제거
          map[nextX][nextY] = 0;
        }
      }
    }
  }
  return flowers;
};

(function backtrack(visited, min, depth, flag) {
  const target = flag ? g : r;
  if (depth === target) {
    return flag
      ? backtrack(visited, 0, 0, false)
      : (answer = Math.max(answer, bfs(visited, candidates)));
  }

  for (let i = min; i < visited.length; i++) {
    if (visited[i]) continue;
    visited[i] = flag ? 1 : 2;
    backtrack(visited, i + 1, depth + 1, flag);
    visited[i] = 0;
  }
})(visited, 0, 0, true);

console.log(answer);

// 풀이
// 1. 배양액 가능한 곳의 좌표를 배열로 나타낸다(최대 10개)
// 2. 배열에서 방문 가능한 조합을 중첩 백트래킹으로 고른다
// 3. 나온 모든 조합에서 각각 bfs를 적용하여 꽃의 개수를 구한다
// 3-1. 갈 수 있는 곳이면, 값을 현재 +-1로 변경한다
// 3-2. 갈 수 없는 곳이면, 이번 차례에 변경된 값인지 확인하고 그렇다면 꽃의 개수를 증가시키고 값을 0으로 변경한다
// (큐에서 제거하고 싶지만 큐를 순회해야 하므로, 0으로 바꾸고 나중에 continue로 처리한다)

// 이해를 편하게 하기 위해
// 0(호수), 1(배양액 불가), 2(배양액 가능) 에서
// 0(호수), 1(초록색), -1(빨간색), Infinity(이동 가능한 곳)으로 바꿈
// 초록색과 빨간색은 이동 거리에 따라 절대값이 커지며, 두 개의 합이 0인 상황에만 꽃을 피울 수 있음

// 실수
// candidates 배열 중에 고른 좌표만 q1에 등록했어야 하는데 모든 좌표를 q1으로 설정하여
// 맵을 참조했을 때 Infinity 값이 나올 수 있었음
