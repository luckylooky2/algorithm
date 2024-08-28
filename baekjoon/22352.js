// 항체 인식 : 그래프, 너비 우선 탐색, 깊이 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
// 최대 30 * 30
const [n, m] = input[0];
let startPoint = 1;
const beforeMap = input.slice(startPoint, startPoint + n);
startPoint = n + 1;
const afterMap = input.slice(startPoint, startPoint + n);
const diff = beforeMap.map((v) => v.slice().fill(0));
const visited = beforeMap.map((v) => v.slice().fill(false));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (beforeMap[i][j] !== afterMap[i][j]) {
      diff[i][j] = afterMap[i][j];
    }
  }
}

function bfs(startPoint, map, visited) {
  const result = map.map((v) => v.slice().fill(false));
  const [x, y] = startPoint;
  const compare = map[x][y];
  const q = [startPoint];
  result[x][y] = true;
  visited[x][y] = true;
  let idx = 0;

  while (idx < q.length) {
    const [x, y] = q[idx++];

    for (const [dx, dy] of dir) {
      const [nextX, nextY] = [x + dx, y + dy];
      if (
        nextX >= n ||
        nextX < 0 ||
        nextY >= m ||
        nextY < 0 ||
        result[nextX][nextY] ||
        compare !== map[nextX][nextY]
      ) {
        continue;
      }
      result[nextX][nextY] = true;
      visited[nextX][nextY] = true;
      q.push([nextX, nextY]);
    }
  }

  return result;
}

function check(map1, map2) {
  // 단순히 범위가 다르다만 비교하면 안 된다
  let compare = null;
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 범위가 다른 경우
      if (map1[i][j] !== !!map2[i][j]) {
        return false;
        // 범위가 같은 경우
      } else {
        // 1 1 1 1
        // 2 2 3 3
        // 처럼 하나의 범위 내에서도 여러 가지 수가 나타날 수도 있기 때문에 변하는 횟수를 세야 한다
        if (map2[i][j] && compare !== map2[i][j]) {
          compare = map2[i][j];
          count++;
        }
        // 2번 이상 넘으면 불가능한 경우
        if (count >= 2) {
          return false;
        }
      }
    }
  }
  return true;
}

let isImpossible = false;
let flag = false;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (beforeMap[i][j] !== afterMap[i][j] && !visited[i][j]) {
      // 현재 지점에서 bfs를 이용해 퍼져나가는 범위를 구한다
      const result = bfs([i, j], beforeMap, visited);
      // 퍼져 나간 범위와 before, after가 다른 범위를 비교한다
      if (!check(result, diff)) {
        isImpossible = true;
      }
      flag = true;
      break;
    }
  }
  if (flag) {
    break;
  }
}

console.log(isImpossible ? "NO" : "YES");
