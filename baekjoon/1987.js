// 알파벳 : 그래프, 깊이 우선 탐색, 백트래킹
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [r, c] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = input.map((v) => v.split(""));
const visit = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").reduce((acc, curr) => {
  acc[curr] = 0;
  return acc;
}, {});
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let [startRow, startCol] = [0, 0];
let answer = 0;
visit[map[startRow][startCol]] = 1;

(function dfs(currPos, map, visit, currCount = 2) {
  const [currRow, currCol] = currPos;
  let canMove = 0;
  for (const [dr, dc] of dir) {
    const [nextRow, nextCol] = [currRow + dr, currCol + dc];
    if (nextRow < 0 || nextRow >= r || nextCol < 0 || nextCol >= c || visit[map[nextRow][nextCol]]) {
      continue;
    }
    canMove++;
    visit[map[nextRow][nextCol]] = currCount;
    dfs([nextRow, nextCol], map, visit, currCount + 1);
    visit[map[nextRow][nextCol]] = 0;
  }
  if (canMove === 0) {
    answer = Math.max(answer, currCount - 1);
  }
})([startRow, startCol], map, visit);

console.log(answer);

// 백트래킹: 시간 초과?

// 결과값이 최대가 되면 더 탐색하지 않고 종료하는 방법
// - 결과값이 최대임을 확정할 수 없음
// - Z만 갇혀있는 상황에서는 최대가 26인데, 실제 최대로 얻을 수 있는 값은 25
// - 결과값 최대를 확정할 수 있는 방법이 있는가?
// - 결론적으로는 실패

// 이 문제는 시간 제한이 2초였음 => c++ 기준
// - c++로 풀어도 꽤 시간이 걸리는 문제. python이나 js는 기준 시간에 3배 정도 여유를 줌
// - js로 풀었을 때는 worst case에서 약 6 ~ 7초 소요
// - **몇 백초가 걸리는 것이 아니면 이런 문제는 원래 오래 걸리는 문제**라는 것을 대충 예상해야 함
// - 또한 dfs에서 **n <= 20**은 10초 이내에 해결이 가능하다는 것을 기억해두자
