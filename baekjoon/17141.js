// 연구소 2 : 그래프, 브루트 포스, 너비 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const map = input;
const visited = map.map((v) => v.slice().fill(false));
const candidates = [];
const [BLANK, WALL, VIRUS] = [0, 1, 2];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let answer = Infinity;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === VIRUS) {
      candidates.push([i, j]);
    } else if (map[i][j] === WALL) {
      visited[i][j] = true;
    }
  }
}

function bfs(q, visited) {
  let idx = 0;
  let result = 0;
  let falseCount = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j] === false) {
        falseCount++;
      }
    }
  }

  while (idx < q.length) {
    const [[currX, currY], count] = q[idx++];

    for (const [dx, dy] of dir) {
      const [nextX, nextY] = [currX + dx, currY + dy];
      if (
        nextX < 0 ||
        nextX >= n ||
        nextY < 0 ||
        nextY >= n ||
        visited[nextX][nextY]
      ) {
        continue;
      }
      q.push([[nextX, nextY], count + 1]);
      result = Math.max(result, count + 1);
      visited[nextX][nextY] = true;
      falseCount--;
    }
  }
  return falseCount ? Infinity : result;
}

(function combination(candidates, target, visited, selected = [], curr = 0) {
  if (selected.length === target) {
    const copyVisited = visited.map((v) => v.slice());
    const pos = selected.map((v) => {
      const [x, y] = candidates[v];
      copyVisited[x][y] = true;
      return [candidates[v], 0];
    });
    const res = bfs(pos, copyVisited);
    answer = Math.min(answer, res);
  }

  for (let i = curr; i < candidates.length; i++) {
    if (selected.includes(i)) {
      continue;
    }

    selected.push(i);
    combination(candidates, target, visited, selected, i);
    selected.pop();
  }
})(candidates, m, visited);

console.log(answer === Infinity ? -1 : answer);

// m <= 2의 개수 <= 10
// 놓을 수 있는 바이러스 1 <= m <= 10
