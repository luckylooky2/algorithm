// 다리 만들기 2 : 브루트 포스, 그래프, 최소 스패닝 트리, 깊이 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const map = input.map((v) => v.map((v) => (v === 0 ? 0 : 9)));
const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
let count = 1;

function dfs(x, y, count) {
  if (x < 0 || x >= n || y < 0 || y >= m) return;
  if (map[x][y] === 9) {
    map[x][y] = count;
  } else return;

  for (let i = 0; i < dir.length; i++) {
    dfs(x + dir[i][0], y + dir[i][1], count);
  }
}

// dfs로 섬 카운트
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 9) {
      dfs(i, j, count);
      count++;
    }
  }
}
count--;

// 섬의 모든 곳에서 네 방향으로 탐색하며 최단 거리 계산
const costs = new Array(count)
  .fill(null)
  .map(() => new Array(count).fill(Infinity));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] !== 0) {
      // 네 방향으로 탐색
      for (let k = 0; k < dir.length; k++) {
        let length = 0;
        let startX = i + dir[k][0],
          startY = j + dir[k][1];
        while (
          !(startX < 0 || startX >= n || startY < 0 || startY >= m) &&
          map[startX][startY] === 0
        ) {
          startX += dir[k][0];
          startY += dir[k][1];
          length++;
        }
        if (length >= 2) {
          if (!(startX < 0 || startX >= n || startY < 0 || startY >= m)) {
            costs[map[i][j] - 1][map[startX][startY] - 1] = Math.min(
              costs[map[i][j] - 1][map[startX][startY] - 1],
              length
            );
            costs[map[startX][startY] - 1][map[i][j] - 1] = Math.min(
              costs[map[startX][startY] - 1][map[i][j] - 1],
              length
            );
          }
        }
      }
    }
  }
}

// 크루스칼 알고리즘으로 최단 거리의 합 계산
const edges = [];
let answer = 0;
const parentArr = new Array(count + 1).fill(null).map((_v, i) => i);

for (let i = 0; i < count; i++) {
  for (let j = i; j < count; j++) {
    if (costs[i][j] !== Infinity) edges.push([i + 1, j + 1, costs[i][j]]);
  }
}

function getParent(a, parentArr) {
  if (parentArr[a] === a) return a;
  else return getParent(parentArr[a], parentArr);
}

function union(a, b, parentArr) {
  a = getParent(a, parentArr);
  b = getParent(b, parentArr);

  if (a > b) parentArr[a] = b;
  else parentArr[b] = a;
}

function find(a, b, parentArr) {
  a = getParent(a, parentArr);
  b = getParent(b, parentArr);

  return a === b;
}

const sorted = edges.sort((a, b) => a[2] - b[2]);

for (let [start, end, cost] of sorted) {
  if (!find(start, end, parentArr)) {
    union(start, end, parentArr);
    count--;
    answer += cost;
  }
}

console.log(count === 1 ? answer : -1);
