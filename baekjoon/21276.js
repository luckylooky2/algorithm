// 계보 복원가 호석 : 그래프, 위상 정렬, 해시를 사용한 집합과 맵, 정렬
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
const reverseEdgeGraph = {};
const edgeGraph = {};

residentArr.forEach((v, i) => {
  residentMap[v] = i;
  residentMap[i] = v;
});

for (let [lower, upper] of edges) {
  indegree[residentMap[upper]]++;
  if (!edgeGraph[lower]) {
    edgeGraph[lower] = {};
  }
  edgeGraph[lower][upper] = true;
  if (!reverseEdgeGraph[upper]) {
    reverseEdgeGraph[upper] = {};
  }
  reverseEdgeGraph[upper][lower] = true;
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
// 정렬 필요
console.log(family.sort().join(" "));

// 메모리 초과 : others 삭제
// 시간 초과 : O(n^4)
// O(n)
for (let currPerson of residentArr) {
  const result = [];

  if (reverseEdgeGraph[currPerson]) {
    // O(n)
    Object.entries(reverseEdgeGraph[currPerson]).map((v) => {
      let flag = false;
      // O(n)
      for (let person of graph[v[0]]) {
        if (reverseEdgeGraph[currPerson][person]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        result.push(v[0]);
      }
    });
  }
  console.log(
    `${currPerson} ${result.length} ${
      result.length === 0 ? "" : result.sort().join(" ")
    }`
  );
}
