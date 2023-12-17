// 음악프로그램 : 그래프, 위상 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const graph = {};
const indegree = new Array(n + 1).fill(0);
const q = [];
const answer = [];

for (let i = 0; i < m; i++) {
  const singerArr = input[i].filter((_value, index) => index !== 0);
  for (let j = 0; j < singerArr.length - 1; j++) {
    const curr = singerArr[j];
    const next = singerArr[j + 1];
    if (!graph[curr]) graph[curr] = [next];
    else graph[curr].push(next);
    indegree[next]++;
  }
}

for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) q.push(i);
}

while (q.length !== 0) {
  const top = q.shift();
  answer.push(top);
  if (!graph[top]) continue;
  for (let node of graph[top]) {
    indegree[node]--;
    if (indegree[node] === 0) q.push(node);
  }
}

console.log(answer.length !== n ? 0 : answer.join("\n"));
