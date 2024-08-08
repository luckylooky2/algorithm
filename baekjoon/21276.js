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
  // 조상 기준으로 값 증가
  indegree[residentMap[upper]]++;
  // 후손 중심으로 조상 저장
  if (!edgeGraph[lower]) {
    edgeGraph[lower] = {};
  }
  edgeGraph[lower][upper] = true;
  // 조상 중심으로 후손 저장
  if (!reverseEdgeGraph[upper]) {
    reverseEdgeGraph[upper] = {};
  }
  reverseEdgeGraph[upper][lower] = true;
  // 그래프는 후손 중심으로 조상 배열 저장
  if (!graph[lower]) graph[lower] = [upper];
  else graph[lower].push(upper);
}

const q = [];

indegree.forEach((count, i) => {
  if (count === 0) {
    // 후손이 큐에 추가
    q.push(residentMap[i]);
  }
});

const family = [];

// 기본 위상 정렬
while (q.length !== 0) {
  // top: 후손 이름
  const top = q.shift();
  // 조상 배열이 나옴
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
    // currPerson의 후손 배열을 순회
    Object.entries(reverseEdgeGraph[currPerson]).map((v) => {
      let flag = false;
      // O(n)
      // 후손 입장에서 조상 배열을 순회
      for (let person of graph[v[0]]) {
        // currPerson의 후손에 person(해당 후손 입장에서 조상)이 하나라도 있다면 해당 후손은 제외
        // 중간 조상이 하나 이상 있다는 뜻이기 때문에
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
