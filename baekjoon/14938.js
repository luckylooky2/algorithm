// 서강그라운드 : 최단 경로, 플로이드, 그래프
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m, r] = input.shift();
const items = input.shift();
const map = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));
const visited = new Array(n).fill(null).map(() => new Array(n).fill(0));

for (let i = 0; i < n; i++) {
  map[i][i] = 0;
  visited[i][i] = 0;
}

input.forEach(([start, end, length]) => {
  map[start - 1][end - 1] = Math.min(length, map[start - 1][end - 1]);
  map[end - 1][start - 1] = Math.min(length, map[end - 1][start - 1]);
});

// 플로이드 : 각 노드 간의 최단거리를 구함
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      const currVal = map[j][k];
      const newVal = map[j][i] + map[i][k];
      if (currVal > newVal) {
        map[j][k] = newVal;
        visited[j][k] = i;
      }
    }
  }
}

const canVisit = new Array(n).fill(null).map(() => new Array(n).fill(0));
let answer = 0;

function dfs(start, end, visited, result) {
  if (visited[start][end] === 0) return;

  dfs(start, visited[start][end], visited, result);
  result.push(visited[start][end]);
  dfs(visited[start][end], end, visited, result);
}

// 시작과 끝 지점 사이의 방문 노드를 추적하며 방문 가능하다면 1로 표시
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (i === j) canVisit[i][i] = 1;
    else if (map[i][j] <= m) {
      const resArr = [i];
      dfs(i, j, visited, resArr);
      resArr.push(j);
      for (let node of resArr) {
        if (canVisit[i][node]) continue;
        canVisit[i][node] = 1;
      }
    }
  }
}

canVisit.forEach((v) => {
  const total = v
    .map((v, i) => (v === 1 ? items[i] : 0))
    .reduce((a, b) => a + b);
  answer = Math.max(total, answer);
});

console.log(answer);
