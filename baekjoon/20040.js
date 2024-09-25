// 사이클 게임 : 분리 집합
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const lines = input;
const parent = new Array(n + 1).fill(0).map((_v, i) => i);
let answer = 0;

function getParent(x) {
  if (x === parent[x]) {
    return x;
  }

  return (x = getParent(parent[x]));
}

function union(x, y) {
  x = getParent(x);
  y = getParent(y);

  if (x > y) {
    parent[x] = y;
  } else {
    parent[y] = x;
  }
}

function find(x, y) {
  return getParent(x) === getParent(y);
}

for (let i = 0; i < lines.length; i++) {
  const [start, end] = lines[i];
  // 이으려고 하는 두 노드가 이미 같은 분리 집합에 속해있으면 종료
  // - **같은 분리 집합에 속한 서로 다른 두 노드를 union 한다면 사이클이 발생한다**
  // - 이미 연결된 상태에서 추가적인 간선을 추가하는 것이므로 사이클이 발생
  // - 사이클은 MST
  if (find(start, end)) {
    answer = i + 1;
    break;
  } else {
    union(start, end);
  }
}

console.log(answer);

// Try 1 : bfs
// - 간선을 한 개 더할 때마다 bfs를 호출하여 사이클이 있는지를 판단
// - 1,000,000개의 간선이라서 시간 초과가 발생할 가능성이 매우 높음

// Try 2 : 분리 집합
// - 간선을 더할 때마다 두 노드의 부모 노드가 같은지 확인한다
// - 같다면, 현재 간선을 추가하면 사이클이 발생하므로 탐색 종료
// - 다르다면, 분리 집합에 추가(union)하고 계속 진행
// - find 함수는 MST에서 사이클을 발생시키지 않도록 하기 위한 역할을 한다

// 사이클 발생을 막는 대표적인 방법
// - 1. bfs의 visit 배열
// - 2. mst의 find 함수
