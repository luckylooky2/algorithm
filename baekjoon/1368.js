// 물대기
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const cost = new Array(n + 1).fill(0);
const edges = [];

for (let i = 0; i < n; i++) {
  cost[i + 1] = input.shift()[0];
}

for (let i = 0; i < n; i++) {
  const costs = input[i];
  for (let j = i; j < n; j++) {
    if (j === i) edges.push([i + 1, i + 1, cost[i + 1]]);
    else edges.push([i + 1, j + 1, costs[j]]);
  }
}

const parent = new Array(n + 1).fill(0).map((_v, i) => i);
const answer = [];

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
const visited = new Array(n + 1).fill(false);

while (sorted.length) {
  const cnt = visited.map((v) => (v === true ? 1 : 0)).reduce((a, b) => a + b);
  if (cnt === n) break;

  const [first, second, cost] = sorted.shift();
  if (first === second) {
    visited[first] = true;
    continue;
  }

  if (!find(first, second)) {
    union(first, second);
    visited[first] = true;
    visited[second] = true;
    answer.push(cost);
  }
}

const result = {};

for (let i = 1; i <= n; i++) {
  if (!result[parent[i]]) result[parent[i]] = [i];
  else result[parent[i]].push(i);
}

Object.entries(result).map(([_key, value]) => {
  let min = Infinity;
  for (let node of value) {
    min = Math.min(min, cost[node]);
  }
  answer.push(min);
});

console.log(answer.reduce((a, b) => a + b));

// 다 이어지더라도 최소한 노드가 1개는 있어야 함
// first === second가 유효하면, 제외해야 함
