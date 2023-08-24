// 단지번호붙이기 : 그래프 이론, 너비 우선 탐색, 깊이 우선 탐색
let arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = arr.shift();
arr = arr.map((v) => v.split("").map((v) => parseInt(v, 10)));
const queue = [];
let check = 2;
const answer = [];

function makeDirection(i, j) {
  return [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j - 1],
  ];
}

function dfs(i, j, count) {
  if (arr[i][j] !== 1) return;

  const direction = makeDirection(i, j);
  arr[i][j] = check;
  count++;
  for (let i = 0; i < direction.length; i++) {
    const y = direction[i][0];
    const x = direction[i][1];
    if (y >= 0 && y < n && x >= 0 && x < n && arr[y][x] === 1)
      count = dfs(y, x, count);
  }
  return count;
}

function bfs() {
  let count = 0;

  while (queue.length !== 0) {
    const [i, j] = queue.shift();
    if (arr[i][j] !== 1) continue;
    arr[i][j] = check;
    count++;
    const direction = makeDirection(i, j);
    for (let i = 0; i < direction.length; i++) {
      const y = direction[i][0];
      const x = direction[i][1];
      if (y >= 0 && y < n && x >= 0 && x < n && arr[y][x] === 1)
        queue.push([y, x]);
    }
  }
  return count;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (arr[i][j] === 1) {
      // answer.push(dfs(i, j, 0));
      queue.push([i, j]);
      answer.push(bfs(i, j));
      check++;
    }
  }
}

answer.sort((a, b) => a - b).unshift(answer.length);
console.log(answer.join("\n"));
