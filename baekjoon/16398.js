// 행성 연결 : 최소 스패닝 트리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;
const arr = new Array(n).fill(null).map((_v, i) => i);
let answer = 0;

function getParent(x) {
  if (arr[x] === x) {
    return x;
  }
  // 경로 압축(Path Compression) 기법 : 매번 얻은 결과값을 일일이 저장
  // - `arr[x] = ` 이 없는 코드는 결과값을 union에서만 단 한 번 저장
  // - 일반적인 경우에서는 차이가 없지만, 최악의 경우에서 차이가 발생
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
