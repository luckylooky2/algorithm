// ABCDE : 그래프, 깊이 우선 탐색, 백트래킹
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const edges = input;
const adjacent = new Array(n).fill(null).map(() => new Array(0));

for (const [start, end] of edges) {
  adjacent[start].push(end);
  adjacent[end].push(start);
}

let flag = false;

// 0 부터 n - 1까지 dfs를 돌려야 할 듯
function dfs(start, visit, count = 0) {
  // answer를 1로 설정하고, 여기서 바로 return하면 하나라도 발견된 경우 가장 바깥 loop를 한 번만에 건너뛸 수 있어서 시간이 훨씬 효율적
  let max = 0;
  // 백트래킹
  if (count === 4) {
    return 4;
  }

  for (const node of adjacent[start]) {
    if (visit[node]) {
      continue;
    }
    visit[node] = true;
    // 전역 변수를 사용하지 않는 방법
    max = Math.max(max, dfs(node, visit, count + 1));
    visit[node] = false;
  }
  return max;
}

for (let i = 0; i < n; i++) {
  const visit = {};

  visit[i] = true;
  if (dfs(i, visit) === 4) {
    flag = true;
    break;
  }
}

console.log(flag ? 1 : 0);

// Try 1 : 분리 집합
// - 사이클이 발생하면 모두 다 알고 있다는 뜻
// - 하나와 모두 연결된 케이스와 일자로 연결된 케이스가 분리 집합 결과가 같게 나오기 떄문에, 분리 집합으로는 구분할 수 없음

// Try 2 : dfs
// - 특정 노드에서 특정 노드까지의 거리가 4 이상인지를 구하는 문제로 바꾸어 생각할 수 있음
// - dfs를 이용해 거리를 측정하는데, 조건이 충족된 경우를 특정해주지 않아서 시간 초과 발생
