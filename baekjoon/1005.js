// ACM Craft : 동적 계획법, 그래프, 깊이 우선 탐색, 위상 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input[0];
let index = 1;

for (let i = 0; i < n; i++) {
  const [n, k] = input[index++];
  const time = input[index++];
  const graph = {};
  const cache = {};
  for (let j = 0; j < k; j++) {
    // shift()가 O(n) 시간 복잡도를 가지고 있어서 발생하는 시간 초과 문제
    const tmp = input[index++];
    if (graph[tmp[1]]) graph[tmp[1]].push(tmp[0]);
    else graph[tmp[1]] = [tmp[0]];
  }
  const [w] = input[index++];

  function dfs(node) {
    // cache[node] 값이 0이 될 수도 있으므로, undefined로 설정해주어야 함
    if (cache[node] !== undefined) return cache[node];
    if (!graph[node]) {
      if (cache[node] === undefined) cache[node] = time[node - 1];
      return time[node - 1];
    }
    let max = -Infinity;
    graph[node].map((v) => (max = Math.max(dfs(v), max)));
    if (cache[node] === undefined) cache[node] = max + time[node - 1];
    return max + time[node - 1];
  }
  console.log(dfs(w));
}

// 정해져있는 목적지부터 거꾸로 시작 => 첫 시작이 어디인지 알 수 없기 때문에
// 단계별로 생각할 필요가 없음
