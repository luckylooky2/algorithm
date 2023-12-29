// 플로이드 2 : 그래프, 최단 경로, 플로이드
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const [m] = input.shift();
const map = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));
const trace = new Array(n).fill(null).map(() => new Array(n).fill(null));
const answer = [];

function dfs(start, end, path, trace) {
  if (start === null || end === null) return;

  dfs(start, trace[start][end], path, trace);
  if (trace[start][end] !== null) {
    path.push(trace[start][end] + 1);
  }
  dfs(trace[start][end], end, path, trace);
}

input.map(([start, end, cost]) => {
  if (map[start - 1][end - 1] > cost) {
    map[start - 1][end - 1] = cost;
  }
});

for (let i = 0; i < n; i++) {
  map[i][i] = 0;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      const currVal = map[j][k];
      const newVal = map[j][i] + map[i][k];
      if (currVal > newVal) {
        trace[j][k] = i;
        map[j][k] = newVal;
      }
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === Infinity) map[i][j] = 0;
  }
  answer.push(map[i]);
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === 0) answer.push([0]);
    else if (trace[i][j] === null) answer.push([2, i + 1, j + 1]);
    else {
      const path = [i + 1];
      dfs(i, j, path, trace);
      path.push(j + 1);
      answer.push([path.length, ...path]);
    }
  }
}

console.log(answer.map((v) => v.join(" ")).join("\n"));
