// 게임 개발
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const graph = {};
const cache = {};
const time = new Array(n + 1).fill(0);

for (let i = 0; i < n; i++) {
  let j = 1;
  time[i + 1] = input[i][0];
  while (input[i][j] !== -1) {
    if (graph[i + 1]) graph[i + 1].push(input[i][j]);
    else graph[i + 1] = [input[i][j]];
    j++;
  }
}

function dfs(number) {
  // 캐시가 직접적으로 사용되는 곳은 여기 밖에 없음
  // 최대값임을 보장할 수 있는가? 모든 경우의 수를 다 살펴보았으면 그렇다
  if (cache[number] !== undefined) return cache[number];

  // 끝 노드일 때 무조건 단일 시간 반환
  if (!graph[number]) {
    if (cache[number] === undefined) cache[number] = time[number];
    return time[number];
  }

  let max = -Infinity;
  for (let node of graph[number]) {
    // 최대값을 보장 : 분기되는 곳에서 max 값을 찾음
    max = Math.max(dfs(node), max);
  }
  // max 값을 cache에 저장 : 이미 최대값을 계산했기 때문에 저장할 수 있음
  if (cache[number] === undefined) cache[number] = max + time[number];
  return max + time[number];
}

for (let i = 1; i <= n; i++) {
  console.log(dfs(i));
}
