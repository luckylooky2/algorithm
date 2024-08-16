// 학교 탐방하기 : 최소 신장 트리, 정렬, 그래프
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input[0];
const edges = input.slice(1, 1 + m + 1);

function getParent(x, parent) {
  if (parent[x] === x) {
    return x;
  }

  return (parent[x] = getParent(parent[x], parent));
}

function union(x, y, parent) {
  x = getParent(x, parent);
  y = getParent(y, parent);

  if (x > y) {
    parent[x] = y;
  } else {
    parent[y] = x;
  }
}

function find(x, y, parent) {
  x = getParent(x, parent);
  y = getParent(y, parent);
  return x === y;
}

function solve(edges, sortFunction) {
  const parent = new Array(n + 1).fill(0).map((_v, i) => i);
  const sorted = edges.map((v) => v.slice()).sort(sortFunction);
  let count = [0, 0];

  for (const [start, end, type] of sorted) {
    if (find(start, end, parent)) {
    } else {
      union(start, end, parent);
      count[type]++;
    }
  }

  return Math.pow(count[0], 2);
}

const max = solve(edges, (a, b) => a[2] - b[2]);
const min = solve(edges, (a, b) => b[2] - a[2]);

console.log(max - min);
