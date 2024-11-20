// 노드사이의 거리 : 트리, 그래프, 깊이 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
let idx = 0;
const [n, m] = input[idx++];
const adjacent = new Array(n + 1).fill(null).map(() => new Array(0));
const answer = [];

for (let i = 0; i < n - 1; i++) {
  const [start, end, cost] = input[idx++];
  adjacent[start].push([end, cost]);
  adjacent[end].push([start, cost]);
}

// 루트 찾기
let root = -1;
let max = -1;

for (let i = 1; i <= adjacent.length; i++) {
  if (adjacent.length > max) {
    root = i;
    max = Math.max(max, adjacent.length);
  }
}

let [startVisit, endVisit] = [[], []];

function dfs(curr, start, end, prev = -1, visit = []) {
  if (curr === start) {
    startVisit = visit.slice();
  }

  if (curr === end) {
    endVisit = visit.slice();
  }

  if (curr !== root && adjacent[curr].length === 1) {
    return;
  }

  for (const [next, cost] of adjacent[curr]) {
    if (prev === next) {
      continue;
    }
    visit.push([next, cost]);
    dfs(next, start, end, curr, visit);
    visit.pop();
  }
}

function solve(start, end) {
  let idx = 0;
  let result = 0;
  while (start.length - 1 >= idx && end.length - 1 >= idx && start[idx][0] === end[idx][0]) {
    idx++;
  }
  for (let i = idx; i < start.length; i++) {
    result += start[i][1];
  }
  for (let i = idx; i < end.length; i++) {
    result += end[i][1];
  }

  return result;
}

for (let i = 0; i < m; i++) {
  const [s, e] = input[idx++];
  dfs(root, s, e);
  answer.push(solve(startVisit, endVisit));
}

console.log(answer.join("\n"));
