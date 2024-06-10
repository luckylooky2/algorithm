// 최소 비용 구하기 2 : 그래프, 최단 경로, 플로이드-워셜, 다익스트라, 재귀 호출
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const [m] = input.shift();
const costs = input;
const map = new Array(n + 1)
  .fill(null)
  .map(() => new Array(n + 1).fill(Infinity));
const visited = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 0; i < m; i++) {
  const [start, end, cost] = costs[i];
  map[start][end] = Math.min(map[start][end], cost);
}
const [start, end] = input.at(-1);

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    for (let k = 1; k <= n; k++) {
      const sum = map[j][i] + map[i][k];
      const crit = map[j][k];
      if (sum < crit) {
        map[j][k] = Math.min(crit, sum);
        visited[j][k] = i;
      }
    }
  }
}

const answer = [start];

(function recur(start, end) {
  const mid = visited[start][end];
  if (!mid) {
    return;
  }

  recur(start, mid);
  answer.push(mid);
  recur(mid, end);
})(start, end);

answer.push(end);

console.log(map[start][end]);
console.log(answer.length);
console.log(answer.join(" "));
