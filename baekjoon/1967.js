// 트리의 지름 : 깊이 우선 탐색, 그래프
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const edges = input;
const connect = new Array(n + 1).fill(null).map(() => new Array(0));

for (const [parent, child, weight] of edges) {
  connect[parent].push([child, weight]);
}

let max = 0;

function dfs(curr, weight = 0) {
  let total = 0;
  let maxValue = 0;
  const children = connect[curr];
  const childrenCnt = children.length;

  if (childrenCnt === 0) {
    return weight;
  }

  const candidates = [];
  for (let i = 0; i < childrenCnt; i++) {
    const res = dfs(children[i][0], children[i][1]);
    candidates.push(res);
    maxValue = Math.max(maxValue, res);
  }

  // 자식 노드 중 가중치(의 합)가 가장 큰 2개 노드의 합
  const sorted = candidates.sort((a, b) => b - a);
  total += (sorted[0] ? sorted[0] : 0) + (sorted[1] ? sorted[1] : 0);

  max = Math.max(max, total);
  return weight + maxValue;
}

dfs(1);

console.log(max);

// Try 1
// - dp : 출발 노드(i)에서 도착 노드(j)까지의 최대 거리를 저장하는 dp[i][j] 테이블
// - 어떻게 테이블을 채울 것인가? => 모르겠음

// Answer(경모님 풀이법)
// - dfs
// - 자식 노드가 3개 이상일 수 있다.
// - 가장 하위 노드부터 시작해서, 해당 노드의 상위 노드로 올라가서 형제 노드를 모두 탐색한다.
// - 형제 노드 중에서 가장 큰 값 두 개의 합으로 max를 최신화 한다 => 현재 서브트리에서 가장 큰 값임이 보장된다.
// - 형제 노드 중에서 가장 큰 하나의 값을 (현재 노드-해당 노드)의 가중치와 더한 값으로 반환한다. => 상위의 서브 트리에서 하나의 자식 노드가 된다.

// 노드가 10,000개여도 dfs를 사용할 수 있는 이유?
// - 간선이 한 번만 계산에 이용된다

// 5
// 5 1 1
// 1 2 1
// 1 3 100
// 4 2 1

// output: 101
// - 루트가 1이 아닌 케이스이기 때문에 틀린 입력이라고 생각한다.

// 12
// 1 3 3
// 1 12 2
// 2 5 1
// 2 11 7
// 3 2 50
// 4 8 15
// 4 9 4
// 6 7 6
// 6 10 10
// 12 4 11
// 12 6 9

// output: 88, expected: 88
// - 루트는 항상 1이다.
// - 부모 노드 번호가 자식 노드 번호보다 클 수 있다.
// - 입력이 트리 구성 순서대로 나오지 않을 수 있다.
