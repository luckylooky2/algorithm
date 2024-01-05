// 계보 복원가 호석
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const residentCnt = Number(input[0][0]);
const residentArr = input[1].sort();
const residentMap = {};
const edges = new Array(Number(input[2][0]))
  .fill(null)
  .map((_v, i) => input[3 + i]);
const indegree = new Array(residentCnt).fill(0);
const graph = {};

residentArr.forEach((v, i) => {
  residentMap[v] = i;
  residentMap[i] = v;
});

for (let [lower, upper] of edges) {
  indegree[residentMap[upper]]++;
  if (!graph[lower]) graph[lower] = [upper];
  else graph[lower].push(upper);
}

const q = [];

indegree.forEach((count, i) => {
  if (count === 0) {
    q.push(residentMap[i]);
  }
});

const family = [];

// 기본 위상 정렬
while (q.length !== 0) {
  const top = q.shift();
  const uppers = graph[top];
  if (!uppers) {
    family.push(top);
    continue;
  }
  for (let upper of uppers) {
    indegree[residentMap[upper]]--;
    if (indegree[residentMap[upper]] === 0) q.push(upper);
  }
}

console.log(family.length);
console.log(family.join(" "));
