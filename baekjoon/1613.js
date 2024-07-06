// 역사 : 플로이드-워셜
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, k] = input.shift();
const cases = input.slice(0, k);
const [s] = input[k];
const questions = input.slice(k + 1);
const visited = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));
const answer = [];

for (const [before, end] of cases) {
  visited[before][end] = -1;
  visited[end][before] = 1;
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    for (let k = 1; k <= n; k++) {
      if (visited[j][i] < 0 && visited[i][k] < 0) {
        visited[j][k] = -1;
      }
      if (visited[k][i] > 0 && visited[i][j] > 0) {
        visited[k][j] = 1;
      }
    }
  }
}

for (const [start, end] of questions) {
  answer.push(visited[start][end]);
}

console.log(answer.join("\n"));

// Try 1
// - 위상 정렬
// - e.g. A - C, B - C의 관계일 때 A - B의 관계는 알지 못한다

// Try 2
// - 플로이드 워셜(동적 계획법) : 모든 정점의 최단 경로를 찾는 알고리즘
// - A -> B -> C와 같이 단계적으로 경로륵 갱신하면서 "모든 중간 경로"를 고려한다
// 1) 처음에는 직행 경로만 고려
// 2) 첫 번째 반복에서는 정점 1을 중간 경로로 고려해 최단 경로를 업데이트
// 3) 두 번째 반복에서는 정점 2를 중간 경로로 고려해 최단 경로를 업데이트
// 모든 가능한 중간 경로를 고려하여 최단 경로를 점진적으로 갱신하기 때문에, 특정 경로가 다른 경로보다 먼저 업데이트되지 않을 가능성은 없다
// - 즉, 순서상 모든 중간 단계를 거치고 다음 단계를 결정하므로 모든 경우에서 최단 거리라고 말할 수 있을 것이다
