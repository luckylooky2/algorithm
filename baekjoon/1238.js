// 파티 : 최단 경로, 그래프
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m, x] = input.shift();
const edges = input;
const times = new Array(n + 1)
  .fill(null)
  .map(() => new Array(n + 1).fill(Infinity));

for (const [start, end, time] of edges) {
  times[start][end] = time;
}

// j -> i -> k(i -> j -> k가 아님)
for (let layover = 1; layover <= n; layover++) {
  for (let start = 1; start <= n; start++) {
    for (let end = 1; end <= n; end++) {
      //   times[layover][end] = Math.min(times[layover][end], times[layover][start] + times[start][end]);
      times[start][end] = Math.min(
        times[start][end],
        times[start][layover] + times[layover][end]
      );
    }
  }
}

let max = 0;
for (let i = 1; i <= n; i++) {
  if (i === x) {
    continue;
  }
  max = Math.max(max, times[i][x] + times[x][i]);
}

console.log(max);

// n이 최대 1000이기 때문에 다익스트라, 플로이드 어느 것을 사용해도 됨

// i -> j -> k : i에서 j를 거쳐 k로 가는 방법
// j -> i -> k : j에서 i를 거쳐 k로 가는 방법(이게 정답, 헷갈리지 않게 주의)

// i, j, k 대신 layover, start, end로 기억하기
