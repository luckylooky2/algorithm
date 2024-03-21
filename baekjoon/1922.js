// 네트워크 연결 : 최소 스패닝 트리, 그래프
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const [m] = input.shift();
const costs = input.slice().sort((a, b) => a[2] - b[2]);
let answer = 0;
const parents = new Array(n + 1).fill(null).map((_v, i) => i);
const getParent = function (x) {
  return x === parents[x] ? parents[x] : getParent(parents[x]);
};
const unionParent = function (x, y) {
  x = getParent(x);
  y = getParent(y);
  if (x < y) {
    parents[y] = x;
  } else {
    parents[x] = y;
  }
};

for (let [start, end, cost] of costs) {
  const x = getParent(start);
  const y = getParent(end);
  // a === b인 경우 union 하지 않는다
  if (x !== y) {
    unionParent(x, y);
    answer += cost;
  }
}

console.log(answer);

// 23'39" / 60'00"
