// 게임 개발 : 깊이 우선 탐색, 동적 계획법, 그래프
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const graph = {};
const time = new Array(n + 1).fill(0);

// dfs ver.
// const cache = {};
// for (let i = 0; i < n; i++) {
//   let j = 1;
//   time[i + 1] = input[i][0];
//   while (input[i][j] !== -1) {
//     if (graph[i + 1]) graph[i + 1].push(input[i][j]);
//     else graph[i + 1] = [input[i][j]];
//     j++;
//   }
// }

// function dfs(number) {
//   // 캐시가 직접적으로 사용되는 곳은 여기 밖에 없음
//   // 최대값임을 보장할 수 있는가? 모든 경우의 수를 다 살펴보았으면 그렇다
//   if (cache[number] !== undefined) return cache[number];

//   // 끝 노드일 때 무조건 단일 시간 반환
//   if (!graph[number]) {
//     if (cache[number] === undefined) cache[number] = time[number];
//     return time[number];
//   }

//   let max = -Infinity;
//   for (let node of graph[number]) {
//     // 최대값을 보장 : 분기되는 곳에서 max 값을 찾음
//     max = Math.max(dfs(node), max);
//   }
//   // max 값을 cache에 저장 : 이미 최대값을 계산했기 때문에 저장할 수 있음
//   if (cache[number] === undefined) cache[number] = max + time[number];
//   return max + time[number];
// }

// for (let i = 1; i <= n; i++) {
//   console.log(dfs(i));
// }

// topological sort ver.
const indegree = new Array(n + 1).fill(0);
const q = [];
// 위상 정렬을 이용하는 경우 동적 계획법은 아니다
const result = new Array(n + 1).fill(0);

for (let i = 0; i < n; i++) {
  let j = 1;
  time[i + 1] = input[i][0];
  while (input[i][j] !== -1) {
    if (graph[input[i][j]]) graph[input[i][j]].push(i + 1);
    else graph[input[i][j]] = [i + 1];
    indegree[i + 1]++;
    j++;
  }
}

for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) {
    q.push(i);
    // indegree가 0인 것은 time[i]를 보장한다
    result[i] = time[i];
  }
}

while (q.length !== 0) {
  const top = q.shift();
  if (!graph[top]) continue;
  for (let node of graph[top]) {
    indegree[node]--;
    // 현재 노드에서 다음 노드로 진출 할 때, 값을 최신화
    result[node] = Math.max(result[node], time[node] + result[top]);
    if (indegree[node] === 0) q.push(node);
    console.log(result);
  }
}

console.log(result.filter((v, i) => i !== 0).join("\n"));

// 큐를 이용한 위상 정렬은 위상 정렬의 흐름대로 다음 결과 값을 채워 나가는 순서로 진행된다
// 재귀를 이용한 dfs는 분기점에서 모든 경우를 탐색하여 결과 값을 업데이트하고, 해당 결과 값을 캐싱하여 다시 사용한다
