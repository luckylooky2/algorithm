// 효도 여행 : 너비 우선 탐색, 깊이 우선 탐색, 그래프, 동적 계획법
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [numofnodes, numofstring] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const string = input.shift();
const edges = input.map((v) =>
  v.split(" ").map((v, i) => (i === 0 || i === 1 ? +v : v))
);
const adjacent = new Array(numofnodes + 1).fill(null).map(() => new Array(0));
const dp = new Array(numofnodes + 1)
  .fill(null)
  .map(() => new Array(numofstring + 1).fill(0));
let answer = 0;

for (const [p, c, char] of edges) {
  adjacent[p].push([c, char]);
  adjacent[c].push([p, char]);
}

function solve(char, prev, next) {
  const prevArr = dp[prev];
  const nextArr = dp[next];
  for (let i = 1; i <= numofstring; i++) {
    nextArr[i] = Math.max(nextArr[i - 1], prevArr[i]);
    if (char === string[i - 1]) {
      nextArr[i] = prevArr[i - 1] + 1;
    }
    answer = Math.max(answer, nextArr[i]);
  }
}

function bfs() {
  const q = [[1, null]];
  let idx = 0;

  while (idx < q.length) {
    const [curr, parent] = q[idx++];

    for (const [next, char] of adjacent[curr]) {
      if (next === parent) {
        continue;
      }
      solve(char, curr, next);
      q.push([next, curr]);
    }
  }
}

bfs();
console.log(answer);

// 소프티어에서 dfs로 5000개 노드는 런타임 오류 발생 => 웬만하면 bfs로 적용하자
