// 작업 : 그래프, 위상 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const graph = {};
const q = [];
const indegree = new Array(n + 1).fill(0);
const cost = new Array(n + 1).fill(0);
const result = new Array(n + 1).fill(0);

for (let i = 0; i < n; i++) {
  cost[i + 1] = input[i][0];
  const count = input[i][1];
  for (let j = 0; j < count; j++) {
    if (!graph[input[i][2 + j]]) graph[input[i][2 + j]] = [i + 1];
    else graph[input[i][2 + j]].push(i + 1);
    indegree[i + 1]++;
  }
}

for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) {
    q.push(i);
    result[i] = cost[i];
  }
}

while (q.length !== 0) {
  const top = q.shift();
  if (!graph[top]) continue;
  for (let next of graph[top]) {
    indegree[next]--;
    result[next] = Math.max(result[next], result[top] + cost[next]);
    if (indegree[next] === 0) {
      q.push(next);
    }
  }
}

// result[n]이 답이 아닌 이유는?
// 특정 (n 번째) 작업이 완료되는 시간을 구하는 것이 아니라 "모든" 작업이 완료되는 시간을 기다림
// 가장 오래 걸리는 작업이 답이 되어야 함(병렬로 실행될 수도 있기 때문에)
console.log(Math.max(...result));
