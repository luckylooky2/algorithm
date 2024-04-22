// 행성 연결 : 최소 스패닝 트리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;
const arr = new Array(n + 1).fill(null).map((_v, i) => i);
let answer = 0;

function getParent(x) {
  if (arr[x] === x) {
    return x;
  }
  // 캐싱하는 방법 :
  return (arr[x] = getParent(arr[x]));
}

function find(x, y) {
  x = getParent(arr[x]);
  y = getParent(arr[y]);

  return x === y;
}

function union(x, y) {
  x = getParent(arr[x]);
  y = getParent(arr[y]);

  if (x > y) {
    arr[x] = y;
  } else {
    arr[y] = x;
  }
}

const q = [];
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    q.push([i, j, map[i][j]]);
  }
}

q.sort((a, b) => a[2] - b[2]);
let idx = 0;

while (idx !== q.length) {
  const [x, y, value] = q[idx++];

  if (!find(x, y)) {
    union(x, y);
    answer += value;
  }
}

console.log(answer);
