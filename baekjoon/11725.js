// 트리의 부모 찾기 : 그래프, 트리, 너비 우선 탐색, 깊이 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const edges = input;
const graph = {};
const parent = new Array(n + 1).fill(0);
const q = [1];

for (let [first, second] of edges) {
  if (!graph[first]) graph[first] = [second];
  else graph[first].push(second);
  if (!graph[second]) graph[second] = [first];
  else graph[second].push(first);
}

while (q.length !== 0) {
  const top = q.shift();

  if (!graph[top]) continue;

  for (let node of graph[top]) {
    if (parent[node]) continue;
    parent[node] = top;
    q.push(node);
  }
}

const answer = parent.filter((v, i) => !(i === 0 || i === 1));
console.log(answer.join("\n"));
