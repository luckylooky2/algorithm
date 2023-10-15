// 치킨 배달 : 시뮬레이션, 브루트 포스, 백트래킹
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => v));
const [n, m] = arr.shift().map((v) => parseInt(v, 10));
const house = [];
const chicken = [];
const visited = [];
const BLANK = "0",
  HOUSE = "1",
  CHICKEN = "2";
let answer = Infinity;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (arr[i][j] === HOUSE) house.push([i, j]);
    else if (arr[i][j] === CHICKEN) chicken.push([i, j]);
  }
}

function dfs(depth = 0) {
  if (depth === m) {
    let total = 0;
    for (let i = 0; i < house.length; i++) {
      let cnt = Infinity;
      for (let j = 0; j < visited.length; j++) {
        cnt = Math.min(
          Math.abs(house[i][0] - chicken[visited[j]][0]) +
            Math.abs(house[i][1] - chicken[visited[j]][1]),
          cnt
        );
      }
      total += cnt;
    }
    answer = Math.min(total, answer);
    return;
  }

  for (let i = 0; i < chicken.length; i++) {
    // 조합
    if (visited.includes(i) || visited[visited.length - 1] > i) continue;
    visited.push(i);
    arr[chicken[i][0]][chicken[i][1]] = BLANK;
    dfs(depth + 1);
    visited.pop();
    arr[chicken[i][0]][chicken[i][1]] = CHICKEN;
  }
}

dfs();
console.log(answer);
