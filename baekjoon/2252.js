// 줄 세우기 : 위상 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const arr = input;
const graph = {};

for (let [first, second] of arr) {
  if (!graph[first]) graph[first] = [second];
  else graph[first].push(second);
}

function topologicalSort(graph) {
  const indegrees = new Array(n + 1).fill(0);
  const q = [];
  const sorted = [];

  for (let i = 1; i <= n; i++) {
    if (graph[i]) {
      for (let value of graph[i]) {
        indegrees[value]++;
      }
    }
  }
  for (let i = 1; i <= n; i++) if (indegrees[i] === 0) q.push(i);
  while (q.length !== 0) {
    const top = q.shift();
    sorted.push(top);
    if (!graph[top]) continue;
    for (let node of graph[top]) {
      indegrees[node]--;
      if (!indegrees[node]) {
        q.push(node);
      }
    }
  }
  return sorted;
}

const sorted = topologicalSort(graph);
if (sorted.length === n) console.log(sorted.join(" "));
