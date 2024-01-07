// 장난감 조립 : 동적 계획법, 그래프, 위상 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const [relationCnt] = input.shift();
const relations = input.sort((a, b) => a[0] - b[0]);
const isMiddlePart = new Array(n + 1).fill(false);
const indegree = new Array(n + 1).fill(0);
const graph = {};
const connectedEdges = {};
const cache = {};

for (let relation of relations) {
  if (!isMiddlePart[relation[0]]) isMiddlePart[relation[0]] = true;
}

for (let [target, need, cost] of relations) {
  if (isMiddlePart[need]) {
    indegree[target]++;
    if (!graph[need]) {
      graph[need] = [target];
    } else {
      graph[need].push(target);
    }
  }
  if (!connectedEdges[target]) {
    connectedEdges[target] = [[need, cost]];
  } else {
    connectedEdges[target].push([need, cost]);
  }
}

const q = [];

for (let i = 1; i <= n; i++) {
  if (isMiddlePart[i] && indegree[i] === 0) q.push(i);
}

function calculate(top) {
  const res = {};
  connectedEdges[top].map(([node, cost]) => {
    if (!isMiddlePart[node]) {
      if (!res[node]) res[node] = cost;
      else res[node] += cost;
    } else {
      Object.entries(cache[node]).map(([cachedNode, cachedCost]) => {
        if (!res[cachedNode]) res[cachedNode] = cost * cachedCost;
        else res[cachedNode] += cost * cachedCost;
      });
    }
  });
  return res;
}

while (q.length !== 0) {
  const top = q.shift();
  cache[top] = calculate(top);
  if (!graph[top]) continue;
  for (let node of graph[top]) {
    indegree[node]--;
    if (indegree[node] === 0) {
      q.push(node);
    }
  }
}

console.log(
  Object.entries(cache[n])
    .map((v) => v.join(" "))
    .join("\n")
);
