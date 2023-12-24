// 물대기
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const edges = [];
const parent = new Array(n + 2).fill(0).map((_v, i) => i);
const answer = [];

for (let i = 0; i < n; i++) {
  const [cost] = input.shift();
  edges.push([i + 1, n + 1, cost]);
}

for (let i = 0; i < n; i++) {
  const costs = input[i];
  for (let j = i + 1; j < n; j++) {
    edges.push([i + 1, j + 1, costs[j]]);
  }
}

function getParent(x) {
  if (parent[x] === x) return x;
  else return getParent(parent[x]);
}

function union(a, b) {
  a = getParent(a);
  b = getParent(b);

  if (a > b) parent[a] = b;
  else parent[b] = a;
}

function find(a, b) {
  a = getParent(a);
  b = getParent(b);

  return a === b;
}

const sorted = edges.sort((a, b) => a[2] - b[2]);

while (sorted.length) {
  const [first, second, cost] = sorted.shift();
  if (!find(first, second)) {
    union(first, second);
    answer.push(cost);
  }
}

console.log(answer.reduce((a, b) => a + b));

// 접근 방법
// 1. 다 이어지더라도 최소한 노드가 1개는 있어야 함
// first === second가 유효하면, 제외해야 함

// 2. 직접 우물을 파는 비용을 [1, 1, 5]로 edges에 포함시키는 방법
// 마지막 parent 배열에서 노드 묶음마다 가장 값이 작은 노드를 결과에 추가
// 노드 묶음을 나누어도 다른 노드 묶음에 연결하는 것이 값이 더 작을 수 있으므로 사용하지 못함

// 3. 가상의 n + 1번 노드를 만들어 직접 우물을 파는 비용을 n + 1번 노드와 연결하는 비용으로 설정
