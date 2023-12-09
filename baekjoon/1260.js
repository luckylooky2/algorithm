// DFS와 BFS : 그래프, 너비 우선 탐색, 깊이 우선 탐색
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m, v] = arr.shift();
const graph = {};

for (let i = 0; i < arr.length; i++) {
  if (!graph[arr[i][0]]) graph[arr[i][0]] = [arr[i][1]];
  else graph[arr[i][0]].push(arr[i][1]);
  if (!graph[arr[i][1]]) graph[arr[i][1]] = [arr[i][0]];
  else graph[arr[i][1]].push(arr[i][0]);
}

for (let i = 1; i <= n; i++) {
  if (graph[i]) graph[i] = graph[i].sort((a, b) => a - b);
}

function bfs(graph) {
  const visited = new Array(n + 1).fill(false);
  const answer = [v];
  const q = [v];
  visited[v] = true;
  while (q.length !== 0) {
    const top = q.shift();
    if (!graph[top]) break;
    for (let node of graph[top]) {
      if (!visited[node]) {
        q.push(node);
        answer.push(node);
        visited[node] = true;
      }
    }
  }
  console.log(answer.join(" "));
}

function dfs(graph) {
  const visited = new Array(n + 1).fill(false);
  const answer = [v];

  function recur(graph, number) {
    if (visited[number]) return;

    visited[number] = true;

    if (!graph[number]) return;
    for (let node of graph[number]) {
      if (!visited[node]) {
        answer.push(node);
        recur(graph, node);
      }
    }
  }

  recur(graph, v);
  console.log(answer.join(" "));
}

dfs(graph);
bfs(graph);
