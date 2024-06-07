// 서강그라운드 : 최단 경로, 플로이드-워셜, 그래프
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

const canVisit = new Array(n).fill(null).map(() => new Array(n).fill(false));
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
    if (i === j) canVisit[i][i] = true;
    else if (map[i][j] <= m) {
      const resArr = [i];
      dfs(i, j, visited, resArr);
      resArr.push(j);
      for (let node of resArr) {
        if (canVisit[i][node]) continue;
        canVisit[i][node] = true;
      }
    }
  }
}

canVisit.forEach((v) => {
  const total = v
    .map((v, i) => (v === true ? items[i] : 0))
    .reduce((a, b) => a + b);
  answer = Math.max(total, answer);
});

console.log(answer);

// 시도 1
// 방문 노드를 추적할 때, 방문한 모든 노드를 매번 배열에 더해서 방문 노드 간의 중복이 발생
// 방문 가능한 노드는 한 번만 더해야 함

// 시도 2
// 방문한 경우 true로 체크 => 마지막에 한 번만 더함
